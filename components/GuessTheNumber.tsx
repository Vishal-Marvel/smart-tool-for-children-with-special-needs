"use client";
import {useEffect, useState} from "react";
import Section from "@/components/Section";
import axios from "axios";
import {useRouter} from "next/navigation";

function generateRandomNumber() {
    return Math.floor(Math.random() * (100 - 1) + 1);
}
interface Props{
    id:string
}
export  const GuessTheNumber = ({id}: Props)=> {
    const router = useRouter();
    const [numTyped, setNumTyped] = useState("");
    const [randomNum, setRandomNum] = useState(generateRandomNumber());
    const [array, setArray] = useState([]);
    const [remainNum, setRemainNum] = useState(7);
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [checkGuessOutcome, setCheckGuessOutcome] = useState("nil");
    const [applyEffect, setApplyEffect] = useState(false);

    function handleChange(event) {
        const { value } = event.target;
        const twoDigitValue = value.slice(0, 2);
        setNumTyped(twoDigitValue);
    }

    function disableButton() {
        setButtonDisabled(true);
        completeGame();
    }

    function arrayPush() {
        if (array.length < 7) {
            setArray((prevArray) => [...prevArray, numTyped]);
        } else {
            disableButton();
        }
    }

    function populateRemain() {
        setRemainNum(7 - array.length);
    }

    function checkGuess() {
        const last = Number(array[array.length - 1]);
        if (array.length === 7 && last !== randomNum) {
            setCheckGuessOutcome("lose");
        } else if (last === randomNum) {
            setCheckGuessOutcome("win");
            disableButton();
        } else if (last < randomNum) {
            setCheckGuessOutcome("low");
        } else if (last > randomNum) {
            setCheckGuessOutcome("high");
        }
    }

    useEffect(() => {
        populateRemain();
        checkGuess();

        if (checkGuessOutcome === "win") {
            disableButton();
        }

        setApplyEffect(true);

        const timer = setTimeout(() => {
            setApplyEffect(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [array, checkGuessOutcome, remainNum]);

    function handleClick() {
        if (numTyped) {
            arrayPush();
            populateRemain();
            checkGuess();
        }
        setNumTyped("");
        if (array.length === 6) {
            disableButton();
        }
    }

    function startNew() {
        setNumTyped("");
        setArray([]);
        setRemainNum(7);
        setButtonDisabled(false);
        setCheckGuessOutcome("nil");
        setRandomNum(generateRandomNumber());
    }
    const completeGame = ()=>{
        if (checkGuessOutcome === "win") {
            axios.post("/api/game-over", {
                gameId: id,
                moves: array.length,
                maxMoves: 7
            }).then(r => {
                alert("You Won")
                router.push("/games/hangman")
            })

        } else if (checkGuessOutcome === "lose") {
            axios.post("/api/game-over", {
                gameId: id,
                moves: 70,
                maxMoves: 7
            }).then(r => {
                alert("You Lost")
                router.push("/games/hangman")
            })
        }
    }


    return (
        <main>
            <Section
                onChangeFunc={handleChange}
                onClickFunc={handleClick}
                inputDigits={numTyped}
                disabled={isButtonDisabled}
                array={array}
                remainNum={remainNum}
                checkGuessOutcome={checkGuessOutcome}
                randomNum={randomNum}
                applyEffect={applyEffect}
            />
        </main>
    );
}