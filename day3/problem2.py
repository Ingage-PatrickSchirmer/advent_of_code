import string 

point = [i for i in string.ascii_lowercase]
point += [j for j in string.ascii_uppercase]


with open('./day3/input.txt') as f:
    lines = f.readlines()
    badges = []
    total = 0
    group = []
    groups = []
    tally = 1
    unq = []
    for line in lines:
        if tally <= 3:
            group.append(line.strip())
            tally += 1
        else:
            groups.append(group)
            tally = 2
            group = []
            group.append(line.strip())
    
    seen = []
    for g in groups:
        for l in g:
            for c in l:
                if c in l[1] and c in l[2]:
                    badges.append(c)
    for i in badges:
        if i not in unq:
            unq.append(i)
        else:
            pass
    for i in unq:
        total += (point.index(i) + 1)
    print(total)                      
        
    
