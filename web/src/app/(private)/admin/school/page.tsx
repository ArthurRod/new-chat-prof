import { Alert } from "@/components/Alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Search, Trash } from "lucide-react";
import { FilterMenu } from "./_components/FilterMenu";

export default function SchoolTeachers() {
  return (
    <section id="school-teachers" className="c-container">
      <div className="rounded bg-neutralLight p-4 shadow-md">
        <div className="mb-4 flex justify-between">
          <FilterMenu />
          <div className="relative">
            <Input type="search" placeholder="Buscar..." className="pr-12" />
            <Button
              type="button"
              className="absolute right-0 top-0 bg-transparent"
            >
              <Search color="#00303a" />
            </Button>
          </div>
        </div>
        <table className="w-full rounded border-hidden bg-white">
          <thead>
            <tr>
              <th className="border-2 border-neutralLight p-4 text-secondary">
                Nome
              </th>
              <th className="border-2 border-neutralLight p-4 text-secondary">
                Matéria(s)
              </th>
              <th className="border-2 border-neutralLight p-4 text-secondary">
                Status
              </th>
              <th className="border-2 border-neutralLight p-4 text-secondary">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-primary-dark border-2 border-neutralLight p-4">
                Professor Teste
              </td>
              <td className="text-primary-dark border-2 border-neutralLight p-4">
                Portugues, Matematica, Filosofia
              </td>
              <td className="text-primary-dark border-2 border-neutralLight p-4">
                <div className="flex items-center justify-center gap-4">
                  Aprovado
                  <Switch />
                </div>
              </td>
              <th className="border-2 border-neutralLight p-4">
                <Alert
                  trigger={
                    <Button type="button" className="bg-white shadow-none">
                      <Trash color="#ef4444" />
                    </Button>
                  }
                  title="Tem certeza que deseja excluir?"
                  content="Esta ação não poderá ser desfeita"
                />
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
