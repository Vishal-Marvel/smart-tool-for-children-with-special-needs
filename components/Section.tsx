import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

export default function Section({
                                    onChangeFunc,
                                    onClickFunc,
                                    inputDigits,
                                    disabled,
                                    array,
                                    remainNum,
                                    checkGuessOutcome,
                                    randomNum,
                                    applyEffect,
                                }) {
    const feedbackClassName = applyEffect ? "effect mt-4" : "mt-4";
    return (
        <div className={"p-3"}>
            <div>
                <span className={"text-indigo-950 font-bold text-3xl"}>Guess a number</span>
                <form className={"m-3  flex flex-row"}  onSubmit={(e)=>{e.preventDefault();onClickFunc()}}>
                    <Input
                        className={"m-2"}
                        placeholder="Enter your Guess"
                        onChange={onChangeFunc}
                        name="digit"
                        value={inputDigits}
                        disabled={disabled}
                    />
                    <Button
                        className={"m-2 "}
                        id="submit"
                        type={"button"}
                        onClick={onClickFunc}
                        disabled={disabled}
                    >
                        Submit guess
                    </Button>
                </form>
                <div id="dmn" className={"mt-[50px] "}>
                    <div>
                        <span id="previous">Previous Guesses:</span>
                        <br/>
                        <span id="previous-g">
                            {array.length > 0 ? array.join(" , ") : "00 00 00 00 00 00 00"}
                        </span>
                    </div>
                    <div className={"mt-3"}>
                        <strong>Guesses Remaining: </strong>
                        {array.length > 0 ? <>{remainNum}</> : <>7</>}
                    </div>
                </div>
            </div>
            <div>
                {checkGuessOutcome === "nil" && (
                    <div id="feedback" className={"mt-4"}>
                        Feedback from <span style={{ color: "gray" }}>your guess</span> will
                        appear here
                    </div>
                )}
                {checkGuessOutcome === "low" && (
                    <div id="feedback" className={feedbackClassName}>
                        Number guessed <span style={{ color: "blue" }}>Low!</span> Try
                        again!
                    </div>
                )}
                {checkGuessOutcome === "high" && (
                    <div id="feedback" className={feedbackClassName}>
                        Number guessed <span style={{ color: "brown" }}>High!</span> Try
                        again!
                    </div>
                )}
                {checkGuessOutcome === "win" && (
                    <div id="feedback" className={feedbackClassName}>
                        <span style={{ color: "green" }}>Congratulations!</span> You guessed
                        correctly, with{" "}
                        <span style={{ color: "green" }}>{array.length}</span> tries!
                    </div>
                )}
                {checkGuessOutcome === "lose" && (
                    <div id="feedback" className={feedbackClassName}>
                        <span style={{ color: "red" }}>Game Over!</span> Chosen number was{" "}
                        <span style={{ color: "red" }}>{randomNum}</span> You guessed
                        wrongly.
                    </div>
                )}

            </div>
        </div>
    );
}

/*
<div id="feedback"><span style={{ color: "yellow" }}>Game Over!</span> Chosen number was <span>{randomNum}</span>You guessed wrongly.</div>
*/