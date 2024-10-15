import CustomTabs from './CustomTabs.tsx';
import { VIDEOS_HIPODROMOS } from './utils.tsx';

const Home = () => {
    const labels = ['Palermo', 'San Isidro'];
    return (
        <div className="p-4">
            <CustomTabs tabLabels={labels} tabContents={VIDEOS_HIPODROMOS} />
        </div>
    );
};

export default Home;
