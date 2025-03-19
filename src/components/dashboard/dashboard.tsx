import { ArrowLeftRight, Copy, CopyCheck, File, Film } from "lucide-react";
import { Card } from "../ui/card";
import CardStat from "./card-stat";
import styles from './dashboard.module.scss';
import TripsGraph from "./trips-graph";

function Dashboard() {
  return (
    <Card className="w-full">
      <div className={styles.dashboard}>
          <div className={styles.cards}>
            <CardStat label="Filmes prestados" total={0} icon={<File className="text-red-600" />} />
            <CardStat label="Filmes devueltos" total={0} icon={<ArrowLeftRight className="text-red-600" />} />
            <CardStat label="Filmes registrados" total={0} icon={<Film className="text-red-600" />} />
            <CardStat label="Total de copias" total={0} icon={<Copy className="text-red-600" />} />
            <CardStat label="Total de copias disponibles" total={0} icon={<CopyCheck className="text-red-600" />} />
          </div>
          <div className={styles.info}>
            <div className={styles.graphs}>
              <TripsGraph
                key="trips-history"
                categories={[]}
                seriesData={[]}
                type="area-line"
                title="Histórico Viajes"
              />
              <TripsGraph
                key="trips-per-month"
                categories={[]}
                seriesData={[]}
                type="column"
                title="Viajes Por Mes"
              />
            </div>
          </div>
        </div>
    </Card>
  );
}

export default Dashboard;
