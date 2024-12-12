import css from "./VacationStatuses.module.css";
import { VacationStatusesModel } from "../../../Models/VacationDataModels";
import { PieChart } from "@mui/x-charts";

type VacationStatusesProps = {
    data: VacationStatusesModel;
}

export function VacationStatusesData(props: VacationStatusesProps): JSX.Element {

    function popularVacations() {
        const vacationData = props.data;
        if (vacationData.future_vacations >= vacationData.on_going_vacations + 3){
                return "Looks like we have a lot of vacations to look forward too!"
            }
        else{
            return "looks like we have a lot more current vacations then future ones. You might want to look into finding more vacation booking for the future"
        }
    }

    return (
        <div className={css.VacationStatuses}>
            <PieChart
            series={[
                {
                data: [
                    { id: 0, value: props?.data?.past_vacations, label: 'Past Vacations' },
                    { id: 1, value: props?.data?.on_going_vacations, label: 'Current Vacations' },
                    { id: 2, value: props?.data?.future_vacations, label: 'Future Vacations' },
                ],
                outerRadius: 65,
                },
            ]}
            width={400}
            height={200}
            />
            <div>{popularVacations()}</div>
        </div>
    );
}
