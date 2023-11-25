import Link from "next/link";


export const UserDashboard = () => {

    return (

        <div className={"p-2 flex flex-col"}>

            <div className={"flex flex-col"}>


                <div className={"m-6 w-fit align-middle items-center justify-center"}>
                    <Link href={"/games/memory-game"}>
                        <span className={" font-bold bg-indigo-950 text-white p-2.5 rounded-2xl "}>Start Game</span>
                    </Link>
                </div>

            </div>

        </div>
    );
}