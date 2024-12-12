import { useEffect, useState } from "react";
import css from "./VacationData.module.css";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../Utils/Notify";
import { vacationDataService } from "../../../Services/vacationDataService";
import { CountriesByLikesModel, VacationStatusesModel, VacationTotalLikesModel, VacationTotalUsersModel } from "../../../Models/VacationDataModels";
import { VacationStatusesData } from "../VacationStatuses/VacationStatuses";
import { CountryByLikesData } from "../CountryByLikes/CountryByLikes";
import { TotalUsersData } from "../TotalUsers/TotalUsers";
import { TotalLikesData } from "../TotalLikes/TotalLikes";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';


export function VacationData(): JSX.Element {
    
    const accessToken = localStorage.getItem('access_token');
    // Assert if a user is authorized based on if we have a token
    const isAuth = accessToken ? true : false;
    const nav = useNavigate();

    useEffect(() => {
        if (accessToken === null) {
            notify.error("You do not have permissions for this page!");
            nav("/");
          }

    }, );

    let isNotifShown = false;

    const [vacationStatuses, setVacationStatuses] = useState<VacationStatusesModel>();
    const [totalUsers, setTotalUsers] = useState<VacationTotalUsersModel>();
    const [totalLikes, setTotalLikes] = useState<VacationTotalLikesModel>();
    const [countriesByLikes, setCountriesByLikes] = useState<CountriesByLikesModel[]>();

    async function requestAxiosData(axiosRequest: Function, setDataState: any){
        try{
            let data = await axiosRequest();
            setDataState(data);
        }
                    
        catch(err:any){
            nav("/");
            if (!isNotifShown){
                notify.error("Data cannot be retrieved at the moment, please try again later");
                isNotifShown = true;
            }
            const token = localStorage.getItem('access_token');
            // return our user authorization
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
            
            
    }

    useEffect (() => {
        if (isAuth){
            requestAxiosData(vacationDataService.getVacationStatus, setVacationStatuses);
            requestAxiosData(vacationDataService.getTotalUsers, setTotalUsers);
            requestAxiosData(vacationDataService.getTotalLikes, setTotalLikes);
            requestAxiosData(vacationDataService.getLikesByCountry, setCountriesByLikes);
        }
    }, [isAuth]);

    const [isShowData, setIsShowData] = useState({
        showStatus: false,
        showUsers: false,
        showLikes: false,
        showCountryLikes: false
    });


    

    return (
        <div className={css.VacationData}>
            <div className={css.VacationSwitches}>
            <Card className={css.customBackgroundColor} style={{ width: '30rem', border: '1px solid white', color: 'white' }}>
                <Card.Body>
                    <Card.Title>Welcome to your vacation data viewing manager!</Card.Title>
                    <Card.Text>
                        Here you can decide what vacation information you want to see
                    </Card.Text>
                    <Card.Text>
                        What would you like to view today?
                    </Card.Text>
                    <Form>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Show/Hide Vacation Statuses Chart"
                        className="mt-2"
                        onClick={() => setIsShowData({...isShowData, showStatus: !isShowData.showStatus})}
                    />
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Show/Hide Total Users Chart"
                        className="mt-2"
                        onClick={() => setIsShowData({...isShowData, showUsers: !isShowData.showUsers})}
                    />
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Show/Hide Total Likes Chart"
                        className="mt-2"
                        onClick={() => setIsShowData({...isShowData, showLikes: !isShowData.showLikes})}
                    />
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Show/Hide Country Likes Table"
                        className="mt-2"
                        onClick={() => setIsShowData({...isShowData, showCountryLikes: !isShowData.showCountryLikes})}
                    />
                    </Form>

                </Card.Body>
            </Card>
           </div>
			<div className={css.ShowVacationData}>
                {isShowData.showStatus && <VacationStatusesData data={vacationStatuses} />}
                {isShowData.showUsers && <TotalUsersData data={totalUsers} />}
                {isShowData.showLikes && <TotalLikesData data={totalLikes} />}
                {isShowData.showCountryLikes && <CountryByLikesData data={countriesByLikes} />}
            </div> 


        </div>
    );
}
