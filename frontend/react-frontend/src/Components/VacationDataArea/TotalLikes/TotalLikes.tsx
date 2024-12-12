import css from "./TotalLikes.module.css";
import { VacationTotalLikesModel } from "../../../Models/VacationDataModels";
import { PieChart } from "@mui/x-charts";

type VacationlikesProps = {
    data: VacationTotalLikesModel;
}

export function TotalLikesData(props: VacationlikesProps): JSX.Element {

    function goodAmountOfLikes(){
        const vacationLikes = props.data.total_likes;
        if (vacationLikes >= 20){
            return "We have a good amount of likes!"
        }
        else{
            return "We have less than 20 likes. You might want to find more users or make a deal for your current users to take more vacations"
        }
    }

    return (
        <div className={css.TotalLikes}>
            <PieChart
            series={[
                {
                data: [
                    { id: 0, value: props?.data?.total_likes, label: 'Total Likes' },
                ],
                outerRadius: 65,
                },
            ]}
            width={400}
            height={200}
            />

            <div>{goodAmountOfLikes()}</div>
        </div>
    );
}
