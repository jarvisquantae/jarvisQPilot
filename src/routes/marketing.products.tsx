import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle2,
  FileSpreadsheet,
  Pill as PillIcon,
  Plus,
  Search,
  Upload,
  X,
} from "lucide-react";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { ConsolePageTitle } from "@/components/layout/ConsoleShell";
import {
  Field,
  FilterBar,
  FilterSelect,
  Panel,
  Pagination,
  Pill,
  TD,
  THead,
  TR,
  TableWrap,
  inputClass,
} from "@/components/console/primitives";
import { Button } from "@/components/ui/button";
import { MM_FILTER_OPTIONS, MM_PRODUCTS } from "@/data/marketing";
import { toast } from "sonner";

export const Route = createFileRoute("/marketing/products")({
  head: () => ({
    meta: [
      { title: "Product Master — Q-Pilot Marketing" },
      {
        name: "description",
        content: "Manage the Q-Pilot product master: molecules, specialties, pitches and vocabulary coverage.",
      },
      { property: "og:title", content: "Product Master — Q-Pilot Marketing" },
      { property: "og:description", content: "Molecules, specialties, pitch counts and vocabulary coverage per product." },
    ],
  }),
  component: MarketingProducts,
});

const statusTone = (status: string) =>
  status === "Active" ? "success" : status === "Draft" ? "warning" : "muted";

function MarketingProducts() {
  const [products, setProducts] = useState(MM_PRODUCTS);
  const [specialtyFilter, setSpecialtyFilter] = useState("All Specialties");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);

  // Modals state
  const [importOpen, setImportOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [viewProduct, setViewProduct] = useState<(typeof MM_PRODUCTS)[number] | null>(null);

  // New product form
  const [newProductName, setNewProductName] = useState("");
  const [newMolecule, setNewMolecule] = useState("");
  const [newSpecialty, setNewSpecialty] = useState("Cardiology");
  const [newStatus, setNewStatus] = useState("Active");

  // Import Excel state
  const [importedFile, setImportedFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);

  const filteredProducts = products.filter((p) => {
    if (specialtyFilter !== "All Specialties" && p.specialty !== specialtyFilter) {
      return false;
    }
    if (statusFilter !== "All Statuses" && p.status !== statusFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.molecule.toLowerCase().includes(q) ||
        p.specialty.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const displayedProducts = filteredProducts.slice(
    (activePage - 1) * pageSize,
    activePage * pageSize
  );

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim() || !newMolecule.trim()) {
      toast.error("Please fill in Product name and Molecule / Strength");
      return;
    }
    const created = {
      name: newProductName.toUpperCase().trim(),
      molecule: newMolecule.trim(),
      specialty: newSpecialty,
      campaigns: 1,
      pitches: 0,
      vocab: 12,
      status: newStatus,
    };
    setProducts([created, ...products]);
    setNewProductName("");
    setNewMolecule("");
    setAddOpen(false);
    toast.success(`Product ${created.name} added to catalog`);
  };

  const handleProcessImport = () => {
    if (!importedFile) {
      toast.error("Please choose an Excel file to import");
      return;
    }
    setImporting(true);
    setTimeout(() => {
      setImporting(false);
      setImportOpen(false);
      setImportedFile(null);
      toast.success(`Successfully imported 4 products from ${importedFile.name}`);
    }, 800);
  };

  return (
    <MarketingShell searchPlaceholder="Search products...">
      <ConsolePageTitle
        title="Product Master"
        subtitle="Single source of truth for products used across campaigns"
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => setImportOpen(true)}>
              <Upload className="size-4" /> Import Excel
            </Button>
            <Button size="sm" onClick={() => setAddOpen(true)}>
              <Plus className="size-4" /> Add Product
            </Button>
          </>
        }
      />

      <FilterBar>
        <FilterSelect
          label="Specialty"
          options={MM_FILTER_OPTIONS.specialty}
          value={specialtyFilter}
          onChange={(val) => {
            setSpecialtyFilter(val);
            setActivePage(1);
          }}
        />
        <FilterSelect
          label="Status"
          options={["All Statuses", "Active", "Draft", "Archived"]}
          value={statusFilter}
          onChange={(val) => {
            setStatusFilter(val);
            setActivePage(1);
          }}
        />
        <label className="flex min-w-[12rem] flex-1 flex-col gap-1.5">
          <span className="text-xs font-semibold text-muted-foreground">Search</span>
          <span className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActivePage(1);
              }}
              className={`${inputClass} pl-9`}
              placeholder="Product or molecule"
            />
          </span>
        </label>
        {(specialtyFilter !== "All Specialties" || statusFilter !== "All Statuses" || searchQuery) && (
          <button
            type="button"
            onClick={() => {
              setSpecialtyFilter("All Specialties");
              setStatusFilter("All Statuses");
              setSearchQuery("");
              setActivePage(1);
              toast.info("Filters cleared");
            }}
            className="h-10 px-2 text-xs font-bold text-primary hover:underline"
          >
            Clear filters
          </button>
        )}
      </FilterBar>

      <Panel
        title="Products"
        info
        bodyClassName=""
        footer={
          <Pagination
            showing={`Showing ${displayedProducts.length > 0 ? (activePage - 1) * pageSize + 1 : 0} to ${Math.min(
              activePage * pageSize,
              filteredProducts.length
            )} of ${filteredProducts.length} products`}
            pages={Array.from({ length: totalPages }, (_, i) => i + 1)}
            activePage={activePage}
            onPageChange={setActivePage}
          />
        }
      >
        <TableWrap>
          <THead
            columns={[
              "Product",
              "Molecule / Strength",
              "Specialty",
              { label: "Campaigns", align: "right" },
              { label: "Pitches", align: "right" },
              { label: "Vocabulary", align: "right" },
              "Status",
              { label: "Actions", align: "right" },
            ]}
          />
          <tbody>
            {displayedProducts.map((product) => (
              <TR key={product.name}>
                <TD strong>
                  <span className="inline-flex items-center gap-2">
                    <span className="grid size-8 place-items-center rounded-lg bg-primary/12 text-primary">
                      <PillIcon className="size-4" />
                    </span>
                    {product.name}
                  </span>
                </TD>
                <TD>{product.molecule}</TD>
                <TD>{product.specialty}</TD>
                <TD align="right">{product.campaigns}</TD>
                <TD align="right">{product.pitches}</TD>
                <TD align="right">{product.vocab} terms</TD>
                <TD>
                  <Pill tone={statusTone(product.status)}>{product.status}</Pill>
                </TD>
                <TD align="right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewProduct(product)}
                  >
                    View
                  </Button>
                </TD>
              </TR>
            ))}
            {displayedProducts.length === 0 && (
              <TR>
                <TD colSpan={8} className="py-8 text-center text-muted-foreground">
                  No products found matching the selected filters.
                </TD>
              </TR>
            )}
          </tbody>
        </TableWrap>
      </Panel>

      {/* Add Product Modal */}
      {addOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-navy">Add New Product</h3>
              <button
                type="button"
                onClick={() => setAddOpen(false)}
                className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted"
              >
                <X className="size-4" />
              </button>
            </div>
            <form onSubmit={handleAddProduct} className="mt-4 space-y-4">
              <Field label="Brand / Product Name" required>
                <input
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  placeholder="e.g. CARDIOVIA"
                  className={inputClass}
                  required
                />
              </Field>
              <Field label="Molecule / Strength" required>
                <input
                  value={newMolecule}
                  onChange={(e) => setNewMolecule(e.target.value)}
                  placeholder="e.g. Amlodipine 5mg + Telmisartan 40mg"
                  className={inputClass}
                  required
                />
              </Field>
              <Field label="Primary Specialty" required>
                <select
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  className={inputClass}
                >
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Diabetology">Diabetology</option>
                  <option value="Pulmonology">Pulmonology</option>
                  <option value="Gastroenterology">Gastroenterology</option>
                </select>
              </Field>
              <Field label="Catalog Status" required>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className={inputClass}
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                </select>
              </Field>
              <div className="mt-6 flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={() => setAddOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Product</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Import Excel Modal */}
      {importOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-navy">Import Products via Excel</h3>
              <button
                type="button"
                onClick={() => setImportOpen(false)}
                className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted"
              >
                <X className="size-4" />
              </button>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Upload an .xlsx or .csv sheet containing columns: Product, Molecule, Specialty, Status.
            </p>

            <div className="mt-4">
              <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/40 bg-mint/30 p-4 text-center transition-colors hover:bg-mint/50">
                <FileSpreadsheet className="size-8 text-primary" />
                <span className="mt-2 text-sm font-bold text-navy">
                  {importedFile ? importedFile.name : "Click to select Excel sheet"}
                </span>
                <span className="mt-0.5 text-xs text-muted-foreground">
                  {importedFile
                    ? `${(importedFile.size / 1024).toFixed(1)} KB`
                    : "Supports .xlsx, .xls, .csv up to 5 MB"}
                </span>
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      setImportedFile(f);
                      toast.info(`Selected file: ${f.name}`);
                    }
                  }}
                />
              </label>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <button
                type="button"
                onClick={() => toast.success("Downloaded sample Excel template")}
                className="font-semibold text-primary hover:underline"
              >
                Download sample template
              </button>
              {importedFile && (
                <button
                  type="button"
                  onClick={() => setImportedFile(null)}
                  className="text-destructive hover:underline"
                >
                  Remove file
                </button>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setImportOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleProcessImport} disabled={!importedFile || importing}>
                {importing ? "Processing..." : "Import Products"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* View Product Details Modal */}
      {viewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-primary/12 text-primary">
                  <PillIcon className="size-6" />
                </span>
                <div>
                  <h3 className="text-xl font-bold text-navy">{viewProduct.name}</h3>
                  <p className="text-xs text-muted-foreground">{viewProduct.molecule}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewProduct(null)}
                className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-5 space-y-3 rounded-xl border border-border bg-muted/20 p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Specialty:</span>
                <span className="font-semibold text-navy">{viewProduct.specialty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active Campaigns:</span>
                <span className="font-semibold text-navy">{viewProduct.campaigns} campaigns</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Approved Pitches:</span>
                <span className="font-semibold text-navy">{viewProduct.pitches} pitches</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Vocabulary Coverage:</span>
                <span className="font-semibold text-navy">{viewProduct.vocab} approved terms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Pill tone={statusTone(viewProduct.status)}>{viewProduct.status}</Pill>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Medical Affairs Approval:</span>
                <span className="inline-flex items-center gap-1 font-semibold text-success">
                  <CheckCircle2 className="size-3.5" /> Approved
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setViewProduct(null)}>
                Close
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  toast.success(`Updated settings for ${viewProduct.name}`);
                  setViewProduct(null);
                }}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </MarketingShell>
  );
}

