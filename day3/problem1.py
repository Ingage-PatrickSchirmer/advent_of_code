import string 

point = [i for i in string.ascii_lowercase]
point += [j for j in string.ascii_uppercase]


with open('./day3/input.txt') as f:
    lines = f.readlines()
    same = []
    same_sack = []
    z = 0
    total = 0
    for line in lines:
        line.strip()
        
        x = (len(line) - 1) /2
        ruck1 = line[:int(x)]
        ruck2 = line[int(x):]
        for i in ruck1:
            for j in ruck2.strip():
                if i == j:
                    same.append(j)
        same_sack.append(same)
        same = []
    for i in same_sack:
        total += (point.index(i[0]) + 1)
            
    print(total)
    
