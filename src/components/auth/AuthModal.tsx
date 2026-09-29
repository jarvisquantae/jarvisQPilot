import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  CheckCircle2,
  KeyRound,
  LineChart,
  Lock,
  Mail,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Target,
  UserCheck,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth, DEMO_USERS } from "@/lib/auth";
import type { UserRole } from "@/types";

const ROLE_NAV: Record<UserRole, string> = {
  TM: "/dashboard",
  MM: "/marketing/dashboard",
  SM: "/sales/dashboard",
  ADMIN: "/admin/dashboard",
};

const ROLES: Array<{
  role: UserRole;
  title: string;
  icon: typeof Target;
  desc: string;
  color: string;
}> = [
  {
    role: "TM",
    title: "Territory Manager",
    icon: Target,
    desc: "Field rep detailing practice, input schedule & scorecards",
    color: "border-primary/40 hover:border-primary bg-mint/30",
  },
  {
    role: "MM",
    title: "Marketing Manager",
    icon: Megaphone,
    desc: "Campaign creation, pitch scripts & brand intelligence",
    color: "border-ai/40 hover:border-ai bg-ai-soft/30",
  },
  {
    role: "SM",
    title: "Sales Manager",
    icon: LineChart,
    desc: "Team command centre, coaching actions & readiness tracking",
    color: "border-info/40 hover:border-info bg-info-soft/30",
  },
  {
    role: "ADMIN",
    title: "Super Admin",
    icon: ShieldCheck,
    desc: "Organization management, tenant security & system audit",
    color: "border-navy/40 hover:border-navy bg-navy/5",
  },
];

export function AuthModal({
  trigger,
  defaultRole,
  open,
  onOpenChange,
}: {
  trigger?: React.ReactNode;
  defaultRole?: UserRole;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const { user, role: currentRole, signInWithEmail, signUpWithEmail, signInWithDemoRole, signOut } =
    useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const effectiveOpen = open !== undefined ? open : isOpen;
  const setEffectiveOpen = onOpenChange !== undefined ? onOpenChange : setIsOpen;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [signupRole, setSignupRole] = useState<UserRole>(defaultRole || "TM");
  const [loading, setLoading] = useState(false);

  const handleDemoSelect = (role: UserRole) => {
    signInWithDemoRole(role);
    toast.success(`Logged in as ${DEMO_USERS[role].name} (${DEMO_USERS[role].roleLabel})`);
    setEffectiveOpen(false);
    navigate({ to: ROLE_NAV[role] });
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    setLoading(true);
    const { error } = await signInWithEmail(email, password);
    setLoading(false);
    if (error) {
      toast.error(error.message || "Failed to sign in");
    } else {
      toast.success("Successfully signed in with Supabase!");
      setEffectiveOpen(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    const { error } = await signUpWithEmail(email, password, name, signupRole);
    setLoading(false);
    if (error) {
      toast.error(error.message || "Failed to create account");
    } else {
      toast.success("Account created successfully! Check your email or test login.");
      setEffectiveOpen(false);
      navigate({ to: ROLE_NAV[signupRole] });
    }
  };

  return (
    <Dialog open={effectiveOpen} onOpenChange={setEffectiveOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-lg sm:rounded-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
            <Sparkles className="size-4" />
            Q-Pilot Access
          </div>
          <DialogTitle className="text-2xl font-extrabold text-navy">
            Sign In to Q-Pilot
          </DialogTitle>
          <DialogDescription>
            Choose your role to access your personalized intelligence console, or sign in with your
            Supabase account.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="demo" className="mt-2">
          <TabsList className="grid w-full grid-cols-3 rounded-xl p-1 bg-muted/60">
            <TabsTrigger value="demo" className="rounded-lg text-xs font-bold">
              1-Click Role
            </TabsTrigger>
            <TabsTrigger value="signin" className="rounded-lg text-xs font-bold">
              Email Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" className="rounded-lg text-xs font-bold">
              Register
            </TabsTrigger>
          </TabsList>

          {/* 1-Click Role Switching */}
          <TabsContent value="demo" className="space-y-3 pt-3">
            <p className="text-xs text-muted-foreground font-medium">
              Instant login for testing each console with simulated permissions:
            </p>
            <div className="grid gap-2.5">
              {ROLES.map((item) => {
                const isCurrent = currentRole === item.role;
                const Icon = item.icon;
                return (
                  <button
                    key={item.role}
                    type="button"
                    onClick={() => handleDemoSelect(item.role)}
                    className={`flex items-start gap-3.5 rounded-xl border p-3 text-left transition-all hover:shadow-soft cursor-pointer ${item.color} ${
                      isCurrent ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-card text-navy shadow-sm">
                      <Icon className="size-5" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-navy">{item.title}</span>
                        {isCurrent && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary">
                            <CheckCircle2 className="size-3.5" />
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </TabsContent>

          {/* Email Sign In */}
          <TabsContent value="signin" className="pt-3">
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="signin-email" className="text-xs font-bold">
                  Email address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="rep@quantae.ai"
                    className="pl-9 rounded-xl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="signin-password" className="text-xs font-bold">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-9 rounded-xl"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit" disabled={loading} className="w-full rounded-xl font-bold">
                {loading ? "Authenticating..." : "Sign In with Supabase"}
              </Button>
            </form>
          </TabsContent>

          {/* Create Account */}
          <TabsContent value="signup" className="pt-3">
            <form onSubmit={handleSignUp} className="space-y-3.5">
              <div className="space-y-1.5">
                <Label htmlFor="signup-name" className="text-xs font-bold">
                  Full Name
                </Label>
                <Input
                  id="signup-name"
                  placeholder="Dr. Arjun Mehta"
                  className="rounded-xl"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="signup-email" className="text-xs font-bold">
                  Work Email
                </Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="arjun@pharma.com"
                  className="rounded-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="signup-password" className="text-xs font-bold">
                  Password
                </Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Minimum 6 characters"
                  className="rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Assigned Role</Label>
                <div className="grid grid-cols-2 gap-2">
                  {ROLES.map((r) => (
                    <button
                      key={r.role}
                      type="button"
                      onClick={() => setSignupRole(r.role)}
                      className={`rounded-xl border p-2 text-xs font-bold transition-all text-left ${
                        signupRole === r.role
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-navy hover:bg-muted"
                      }`}
                    >
                      {r.title}
                    </button>
                  ))}
                </div>
              </div>
              <Button type="submit" disabled={loading} className="w-full rounded-xl font-bold mt-2">
                {loading ? "Creating..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
