import {Howl} from "howler";

const sound = new Howl({
    src: ["/audio/winner.mp3"]
})
const great = new Howl({
    src: ["/audio/great_job.mp3"]
})
const well = new Howl({
    src: ["/audio/well_done.mp3"]
})
const keep = new Howl({
    src: ["/audio/keep_going.mp3"]
})

export {sound, great, keep, well};