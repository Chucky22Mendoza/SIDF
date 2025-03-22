import { ArrowLeftRight, Copy, CopyCheck, File, Film } from "lucide-react";
import { Card } from "../ui/card";
import CardStat from "./card-stat";
import styles from './dashboard.module.scss';
import CardTitleGraph from "./card-title-graph";
import { useDashboard } from "@/hooks/useDashboard";
import { useDashboardStore } from "@/store/DashboardStore";
import { useCallback, useEffect, useState } from "react";
import TableFilms from "./table-films";
import AreaChart from "../ui/area-chart";
import EmptyTable from "../ui/EmptyTable";
import { Input } from "../ui/input";
import { FormField } from "../shared/form-field";
import { format, isAfter, isSameDay, subMonths } from "date-fns";
import { toast } from "sonner";
import debounce from "lodash.debounce";

function Dashboard() {
  const { get } = useDashboard();
  const dashboard = useDashboardStore((state) => state.dashboard);
  const [dates, setDates] = useState({
    endDate: format(new Date(), 'yyyy-MM-dd'),
    startDate: format(subMonths(new Date(), 3), 'yyyy-MM-dd'),
  })

  const handleFilters = async (startDate: string, endDate: string) => {
    if (endDate && startDate) {
      if (isAfter(endDate, startDate) || isSameDay(endDate, startDate)) {
        await get(startDate, endDate);
        return;
      }
      toast.error('Fecha inicio no puede ser mayor a fecha fin');
    }
  };

  const debounceHandlerSearch = useCallback(debounce(handleFilters, 300), []);

  useEffect(() => {
    debounceHandlerSearch(dates.startDate, dates.endDate);
  }, [dates, debounceHandlerSearch]);

  return (
    <Card className="w-full">
      <div className={styles.dashboard}>
        <div className={styles.cards}>
          <CardStat label="Filmes prestados" total={dashboard.loans} icon={<File className="text-red-600" />} />
          <CardStat label="Filmes devueltos" total={dashboard.returns} icon={<ArrowLeftRight className="text-red-600" />} />
          <CardStat label="Filmes registrados" total={dashboard.films} icon={<Film className="text-red-600" />} />
          <CardStat label="Total de copias" total={dashboard.copies} icon={<Copy className="text-red-600" />} />
          <CardStat label="Total de copias disponibles" total={dashboard.available} icon={<CopyCheck className="text-red-600" />} />
        </div>
        <div className="flex flex-row self-stretch gap-1">
          <FormField
            label="Inicio"
            input={
              <Input
                type="date"
                placeholder="Fecha Inicio"
                max={dates.endDate}
                value={dates.startDate}
                onChange={(e) => setDates({
                  ...dates,
                  startDate: e.target.value,
                })}
              />
            }
          />
          <FormField
            label="Fin"
            input={
              <Input
                type="date"
                placeholder="Fecha Fin"
                value={dates.endDate}
                max={format(new Date(), 'yyyy-MM-dd')}
                onChange={(e) => setDates({
                  ...dates,
                  endDate: e.target.value,
                })}
              />
            }
          />
        </div>
        <div className={styles.info}>
          <CardTitleGraph
            key="films-loans"
            title="Los más prestados"
          >
            {
              dashboard.loan_films && dashboard.loan_films.length > 0
                ? (<TableFilms films={dashboard.loan_films} />)
                : (<EmptyTable />)
            }
          </CardTitleGraph>
          <div className={styles.graphs}>
            <CardTitleGraph
              key="copies-loans"
              title="Préstamos por mes"
            >
              {
                dashboard.loans_graph && dashboard.loans_graph.length > 0
                  ? (
                    <AreaChart
                      dataPoints={dashboard.loans_graph?.map((item) => item.total)}
                      labels={dashboard.loans_graph?.map((item) => item.month)}
                    />
                  ) : (<EmptyTable />)
              }
            </CardTitleGraph>
            <CardTitleGraph
              key="copies-returns"
              title="Devoluciones por mes"
            >
              {
                dashboard.returns_graph && dashboard.returns_graph.length > 0
                  ? (
                    <AreaChart
                      dataPoints={dashboard.returns_graph?.map((item) => item.total)}
                      labels={dashboard.returns_graph?.map((item) => item.month)}
                    />
                  ) : (<EmptyTable />)
              }
            </CardTitleGraph>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Dashboard;
