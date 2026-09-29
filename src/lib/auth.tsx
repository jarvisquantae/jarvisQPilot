import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User as SupabaseAuthUser, Session } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { User, UserRole } from "@/types";

export const DEMO_USERS: Record<UserRole, User> = {
  TM: {
    id: "usr-tm-001",
    name: "Arjun Mehta",
    role: "TM",
    roleLabel: "Territory Manager",
    email: "tm.manager@quantae.ai",
    territory: "North Zone",
    reportingManager: "Regional Sales Manager",
    currentCampaignId: "cardiocare-a",
    initials: "AM",
  },
  MM: {
    id: "usr-mm-001",
    name: "Sarah Jenkins",
    role: "MM",
    roleLabel: "Marketing Manager",
    email: "marketing.lead@quantae.ai",
    territory: "Corporate HQ",
    reportingManager: "VP Brand Marketing",
    currentCampaignId: "cardiocare-a",
    initials: "SJ",
  },
  SM: {
    id: "usr-sm-001",
    name: "Vikram Malhotra",
    role: "SM",
    roleLabel: "Sales Manager",
    email: "sales.director@quantae.ai",
    territory: "North & East Region",
    reportingManager: "VP Commercial Operations",
    currentCampaignId: "cardiocare-a",
    initials: "VM",
  },
  ADMIN: {
    id: "usr-adm-001",
    name: "Super Admin",
    role: "ADMIN",
    roleLabel: "System Administrator",
    email: "admin@quantae.ai",
    territory: "Global",
    reportingManager: "Chief Technology Officer",
    currentCampaignId: "cardiocare-a",
    initials: "SA",
  },
};

interface AuthContextValue {
  session: Session | null;
  supabaseUser: SupabaseAuthUser | null;
  user: User;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUpWithEmail: (
    email: string,
    password: string,
    name: string,
    role: UserRole,
  ) => Promise<{ error: Error | null }>;
  signInWithDemoRole: (role: UserRole) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "qpilot_active_role";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseAuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeRole, setActiveRole] = useState<UserRole>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY) as UserRole | null;
      if (stored && DEMO_USERS[stored]) return stored;
    }
    return "TM";
  });
  const [liveProfile, setLiveProfile] = useState<User | null>(null);

  // Fetch or upsert profile from Supabase if an auth session exists
  const syncProfile = useCallback(async (sbUser: SupabaseAuthUser) => {
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", sbUser.id)
        .maybeSingle();

      if (profile && !error) {
        const mappedUser: User = {
          id: profile.id,
          name: profile.name,
          role: profile.role as UserRole,
          roleLabel: profile.role_label,
          email: profile.email,
          territory: profile.territory ?? "Unassigned",
          reportingManager: profile.reporting_manager ?? "Manager",
          currentCampaignId: profile.current_campaign_id ?? "cardiocare-a",
          initials: profile.initials ?? profile.name.slice(0, 2).toUpperCase(),
        };
        setLiveProfile(mappedUser);
        setActiveRole(mappedUser.role);
        return;
      }

      // Upsert default profile for newly registered user
      const defaultRole = (sbUser.user_metadata?.role as UserRole) || "TM";
      const name = sbUser.user_metadata?.name || sbUser.email?.split("@")[0] || "User";
      const roleLabel = DEMO_USERS[defaultRole]?.roleLabel || "Territory Manager";
      const initials = name.slice(0, 2).toUpperCase();

      await supabase.from("profiles").upsert({
        id: sbUser.id,
        email: sbUser.email,
        name,
        role: defaultRole,
        role_label: roleLabel,
        territory: "Field Territory",
        reporting_manager: "Manager",
        current_campaign_id: "cardiocare-a",
        initials,
      });

      const fallback: User = {
        id: sbUser.id,
        name,
        role: defaultRole,
        roleLabel,
        email: sbUser.email || "",
        territory: "Field Territory",
        reportingManager: "Manager",
        currentCampaignId: "cardiocare-a",
        initials,
      };
      setLiveProfile(fallback);
      setActiveRole(defaultRole);
    } catch (err) {
      console.warn("Failed to sync profile from Supabase:", err);
    }
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setIsLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setSupabaseUser(session?.user ?? null);
      if (session?.user) {
        syncProfile(session.user).finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setSupabaseUser(session?.user ?? null);
      if (session?.user) {
        syncProfile(session.user);
      } else {
        setLiveProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [syncProfile]);

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { error };
      if (data.session) {
        setSession(data.session);
        setSupabaseUser(data.user);
        await syncProfile(data.user);
      }
      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  }, [syncProfile]);

  const signUpWithEmail = useCallback(
    async (email: string, password: string, name: string, role: UserRole) => {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name, role },
          },
        });
        if (error) return { error };
        if (data.user) {
          setSupabaseUser(data.user);
          await syncProfile(data.user);
        }
        return { error: null };
      } catch (err: any) {
        return { error: err };
      }
    },
    [syncProfile],
  );

  const signInWithDemoRole = useCallback((role: UserRole) => {
    setActiveRole(role);
    setLiveProfile(null);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, role);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      if (isSupabaseConfigured() && session) {
        await supabase.auth.signOut();
      }
    } catch (err) {
      console.warn("Sign out error:", err);
    } finally {
      setSession(null);
      setSupabaseUser(null);
      setLiveProfile(null);
      signInWithDemoRole("TM");
    }
  }, [session, signInWithDemoRole]);

  const user = useMemo(() => {
    if (liveProfile) return liveProfile;
    return DEMO_USERS[activeRole] || DEMO_USERS.TM;
  }, [liveProfile, activeRole]);

  const value = useMemo(
    () => ({
      session,
      supabaseUser,
      user,
      role: user.role,
      isAuthenticated: Boolean(session || activeRole),
      isLoading,
      signInWithEmail,
      signUpWithEmail,
      signInWithDemoRole,
      signOut,
    }),
    [
      session,
      supabaseUser,
      user,
      isLoading,
      activeRole,
      signInWithEmail,
      signUpWithEmail,
      signInWithDemoRole,
      signOut,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
