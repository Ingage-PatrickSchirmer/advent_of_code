const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8")


// % = flip flop inititally off nothing on high/ low toggles state on off/ sends high when turned on, sends low when turned off


// $ = conjuction/ remembers last pulse from each connection / defaults to remembering low / when recieved first updates memeory to remembered state
    // then if it remembers high for all inputs it sends a low pulse, otherwise it sends a high pulse

// broadcaster when recieves it sends same pulse to its destination modules

// button module when pushed sends low pulse to broadcaster 

// cant push button until all previous pulses have been delivered  and fully handled.