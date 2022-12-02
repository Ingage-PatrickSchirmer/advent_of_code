elves = []
elves.append(0)
elf = 0
with open('input.txt') as f:
    lines = f.readlines()
    for line in lines:
        if line.strip() != '':
            elves[elf] += int(line)
        else:
            elf += 1
            elves.append(elf)
 

mostCal = 0
for elve in elves:
    if elve > mostCal:
        mostCal = elve
        pos = elves.index(elve)
    else:
        pass
print(pos, mostCal)