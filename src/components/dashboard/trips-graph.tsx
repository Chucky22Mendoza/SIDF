import EmptyTable from '../ui/EmptyTable';
import styles from './dashboard.module.scss';

type Props = {
  seriesData: number[];
  categories: string[];
  type: 'column' | 'area-line';
  title: string;
};

function TripsGraph(props: Props) {
  return (
    <div className={styles.graph}>
      <h1>{props.title}</h1>
      {
        props.seriesData.length === 0 || props.seriesData.every((value) => value === 0)
          ? <EmptyTable />
          : null
      }
    </div>
  );
}

export default TripsGraph;