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
            elves.append(0)
elves.sort(reverse=True)
print(elves)


top3 = elves[0] + elves[1] + elves[2]
print(top3)
print(elves[0], elves[1], elves[2])

            