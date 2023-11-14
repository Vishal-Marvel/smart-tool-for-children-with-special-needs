"use client"
import { useCallback, useEffect, useState } from 'react';
import words from '@/components/Hangman/wordList.json';
import HangmanDraw from '@/components/Hangman/HangmanDraw';
import HangmanWord from '@/components/Hangman/HangmanWord';
import Keyboard from '@/components/Hangman/Keyboard';
import { ToastContainer, toast } from 'react-toastify';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import axios from "axios";
import {useRouter} from "next/navigation";

interface Props{
    id:string
}
export const Hangman = ({id}: Props)=> {
    const router = useRouter();
    const [wordToGuess, setWordToGuess] = useState(() => {
        return words[Math.floor(Math.random() * words.length)]
    });

    const [guessLetters, setGuessLetters] = useState<string[]>([]);
    const [message, setMessage] = useState("");
    // take and filter the letters we guess
    const incorrectLetters = guessLetters.filter(
        letter => !wordToGuess.includes(letter)
    )
    const wait = async (milliseconds: number): Promise<void> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, milliseconds);
        });
    };
    const isLoser = incorrectLetters.length >= 6;
    const isWinner = wordToGuess
        .split('')
        .every(letter => guessLetters.includes(letter));

    const addGuessLetter = useCallback((letter: string) => {
        if (guessLetters.includes(letter) || isLoser || isWinner) {
            return
        } else {
            setGuessLetters(currentLetters => [...currentLetters, letter])
        }
    }, [guessLetters, isLoser, isWinner])

    // keyboard event handler
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key

            if (!key.match(/^[a-z]$/)) {
                return
            } else {
                e.preventDefault();
                addGuessLetter(key);
            }
        }

        document.addEventListener('keypress', handler)

        return () => {
            document.removeEventListener("keypress", handler)
        }
    }, [guessLetters]);

    useEffect(() => {
        if (isWinner) {
            wait(300).then(r=>{
                alert("Congratulations you won!!")
                axios.post("/api/game-over", {
                    gameId: id,
                    moves: 1,
                    maxMoves: 1
                }).then(r  =>{

                    router.push("/games/rock-paper-scissor")
                })
            })

        }
    }, [isWinner]);

    useEffect(() => {
        if (isLoser) {
            wait(300).then(r=>{
                alert("Oops!! You Lost")
                axios.post("/api/game-over", {
                    gameId: id,
                    moves: 20,
                    maxMoves: 1
                }).then(r  =>{

                    router.push("/games/rock-paper-scissor/games/rock-paper-scissor")
                })
            })


        }
    }, [isLoser, wordToGuess]);

    return (
        <div>

            <div className='font-adlam flex max-w-5xl items-center  flex-row gap-8 mx-auto pt-12'>

                {/* I want to know how many times I chose the wrong letter */}
                <div className={"flex flex-col mr-10"}>
                <HangmanDraw numberOfGuess={incorrectLetters.length} />
                <HangmanWord
                    result={isLoser}
                    guessLetters={guessLetters}
                    wordToGuess={wordToGuess}
                />
                </div>
                <div className={"ml-10"}>
                    <Keyboard
                        disabled={isWinner || isLoser}
                        activeLetter={guessLetters.filter(letter => wordToGuess.includes(letter))}
                        inactiveLetter={incorrectLetters}
                        addGuessLetter={addGuessLetter}
                    />
                </div>
            </div>
        </div>
    )
}

