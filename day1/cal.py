elves = []
elves.append(0)
elf = 0
with open('./day1/input.txt') as f:
    lines = f.readlines()
    for line in lines:
        if line.strip() != '':
            elves[elf] += int(line)
        else:
            elf += 1
            elves.append(0)
elffer = [x.strip() for x in lines]
elves.sort()
print(elves[-1])
with open('test1.txt', 'w') as w:
    for x in elffer:
        w.write(f"{str(x)}\n")
with open('test2.txt', 'w') as w:
    for i in elves:
        w.write(f"{str(i)}\n")

    
# mostCal = 0
# for elve in elves:
#     if elve > mostCal:
#         mostCal = elve
#         pos = elves.index(elve)
#     else:
#         pass
# print(pos, mostCal)



