import { ArrowLeftRight, Copy, CopyCheck, File, Film } from "lucide-react";
import { Card } from "../ui/card";
import CardStat from "./card-stat";
import styles from './dashboard.module.scss';
import CardTitleGraph from "./card-title-graph";
import { useDashboard } from "@/hooks/useDashboard";
import { useDashboardStore } from "@/store/DashboardStore";
import { useEffect } from "react";
import TableFilms from "./table-films";
import AreaChart from "../ui/area-chart";
import EmptyTable from "../ui/EmptyTable";

function Dashboard() {
  const { get } = useDashboard();
  const dashboard = useDashboardStore((state) => state.dashboard);

  useEffect(() => {
    get('01-01-2025 00:00:00', '31-12-2025 23:59:59');
  }, []);

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
