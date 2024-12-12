import css from "./TotalUsers.module.css";
import { VacationTotalUsersModel } from "../../../Models/VacationDataModels";
import { PieChart } from "@mui/x-charts";

type VacationUsersProps = {
    data: VacationTotalUsersModel;
}

export function TotalUsersData(props: VacationUsersProps): JSX.Element {

    function goodAmountOfUsers(){
        const vacationUsers = props.data.total_users;
        if (vacationUsers >= 10){
            return "We have a good amount of users!"
        }
        else{
            return "We have less than 10 users. You might want to advertise our website to your friends"
        }
    }

    return (
        <div className={css.TotalUsers}>
			<PieChart
            series={[
                {
                data: [
                    { id: 0, value: props?.data?.total_users, label: 'Total Users' },
                ],
                outerRadius: 65,
                },
            ]}
            width={400}
            height={200}
            />

            <div>{goodAmountOfUsers()}</div>
        </div>
    );
}
