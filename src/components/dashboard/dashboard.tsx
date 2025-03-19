import { ArrowLeftRight, Copy, CopyCheck, File, Film } from "lucide-react";
import { Card } from "../ui/card";
import CardStat from "./card-stat";
import styles from './dashboard.module.scss';
import TripsGraph from "./trips-graph";
import { useDashboard } from "@/hooks/useDashboard";
import { useDashboardStore } from "@/store/DashboardStore";
import { useEffect } from "react";

function Dashboard() {
  const { get } = useDashboard();
  const dashboard = useDashboardStore((state) => state.dashboard);

  useEffect(() => {
    get();
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
            <div className={styles.graphs}>
              <TripsGraph
                key="copies-history"
                categories={[]}
                seriesData={[]}
                type="area-line"
                title="Histórico Prestamos"
              />
              <TripsGraph
                key="copies-per-month"
                categories={[]}
                seriesData={[]}
                type="column"
                title="Historico Devoluciones"
              />
            </div>
          </div>
        </div>
    </Card>
  );
}

export default Dashboard;
