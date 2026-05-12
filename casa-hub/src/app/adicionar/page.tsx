import { CirclePlus } from "lucide-react";
import { AppCard } from "@/components/ui/AppCard";
import { EmptyInput } from "@/components/ui/EmptyInput";
import { PageHeader } from "@/components/ui/PageHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { StatusPill } from "@/components/ui/StatusPill";

const shortcuts = [
  ["Comprar algo", "lista de compras", "pendente"],
  ["Lembrar Snoopy", "racao, banho, vacina ou consulta", "pet"],
  ["Planejar cinema", "lancamento ou noite do filme", "evento"],
  ["Registrar gasto", "conta, parcela ou compra da casa", "conta"]
];

export default function AdicionarPage() {
  return (
    <>
      <PageHeader
        eyebrow="Entrada rapida"
        title="Adicionar"
        description="Uma aba para sempre registrar algo novo: compra, conta, evento, comida, filme, viagem, Snoopy ou recado."
      />
      <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <AppCard>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-black text-cocoa">
            <CirclePlus size={20} /> Novo item
          </h2>
          <div className="grid gap-3">
            <EmptyInput placeholder="Titulo do que voce quer adicionar" />
            <select className="focus-ring rounded-[8px] border border-cocoa/10 bg-white px-3 py-2 text-sm">
              <option>Lista de compras</option>
              <option>Conta ou gasto</option>
              <option>Evento no calendario</option>
              <option>Comida ou receita</option>
              <option>Filme, serie ou cinema</option>
              <option>Viagem</option>
              <option>Snoopy</option>
              <option>Bem-estar / recado</option>
            </select>
            <div className="grid gap-3 sm:grid-cols-2">
              <select className="focus-ring rounded-[8px] border border-cocoa/10 bg-white px-3 py-2 text-sm">
                <option>Karina</option>
                <option>Kaleb</option>
                <option>Karolyne</option>
              </select>
              <select className="focus-ring rounded-[8px] border border-cocoa/10 bg-white px-3 py-2 text-sm">
                <option>Prioridade normal</option>
                <option>Urgente</option>
                <option>Baixa</option>
              </select>
            </div>
            <EmptyInput placeholder="Data, quantidade ou valor" />
            <EmptyInput placeholder="Observacao rapida" />
            <PrimaryButton>Adicionar na Casa Hub</PrimaryButton>
          </div>
        </AppCard>
        <AppCard>
          <h2 className="mb-4 text-xl font-black text-cocoa">Atalhos</h2>
          <div className="space-y-2">
            {shortcuts.map(([title, detail, status]) => (
              <div key={title} className="rounded-[8px] bg-white p-3">
                <div className="flex items-center justify-between gap-2">
                  <strong className="text-cocoa">{title}</strong>
                  <StatusPill value={status} />
                </div>
                <p className="mt-1 text-sm font-semibold text-cocoa/55">{detail}</p>
              </div>
            ))}
          </div>
        </AppCard>
      </div>
    </>
  );
}
