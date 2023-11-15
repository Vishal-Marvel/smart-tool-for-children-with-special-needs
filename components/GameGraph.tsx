import ChartComponent from "@/components/Chart";
import {useState} from "react";
import {db} from "@/lib/db";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {FormControl} from "@/components/ui/form";

export const GameGraph = () => {
    const labels = ['Hand eye coordination.', 'Visual attention with coordination assessment', 'Visual problem solving ability with motor skill', 'Visual cognitive reasoning with  motor stability', 'Visual discrimination and motor response'];
    const [username, setUsername] = useState("");
    const [data, setData] = useState(Array)

    let users;
    db.users.findMany().then(r => {
        users = r;
    });


    const datasets = [
        {
            label: username,

            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        },
    ]
    const onChange = () => {

    }
    return (
        <>
            <Select
                onValueChange={onChange}
            >
                <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a Gender"/>
                    </SelectTrigger>
                </FormControl>

                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <ChartComponent labels={labels} datasets={datasets}/>
        </>
    )
}