import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
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
              <th className="border-2 border-neutralLight p-4"></th>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
