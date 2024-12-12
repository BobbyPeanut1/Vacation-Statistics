import css from "./CountryByLikes.module.css";
import {CountriesByLikesModel} from "../../../Models/VacationDataModels"
import Table from 'react-bootstrap/Table';

type CountriesByLikesProps = {
    data: CountriesByLikesModel[];
}

export function CountryByLikesData(props: CountriesByLikesProps): JSX.Element {


    return (
        <div className={css.CountryByLikes}>
			<div>
                <div>
                    <p>This data is more tricky and needs following</p>
                    <p>Try looking for which destination sells more and why</p>
                    <p>Consider finding more vacations to sell from successful destinations, or alternatively try to find a way to market our less sold destinations </p>
                </div>
                <Table responsive striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th className="text-light bg-primary">Destination</th>
                            <th className="text-light bg-primary">Likes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props?.data?.map(country =>
                            <tr key={country.destination}>
                                <th className="text-light bg-dark">{country.destination}</th>
                                <th className="text-light bg-dark">{country.likes}</th>
                            </tr>)}
                    </tbody>
                </Table>
                
            </div>
            
        </div>
    );
}
