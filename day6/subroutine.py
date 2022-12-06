with open('./day6/input.txt') as f:
    lines = f.readlines()

def check(lines):
    key = ''    
    for line in lines:
        for i in line:
            key+= i
    
    x = 0
    temp = []
    for line in lines:
        line = line.strip()
        for i,j in enumerate(line):    
            four = line[i:i+4]
            for i in four:
                if i not in temp: 
                    temp.append(i)
                    if len(temp) == 4:
                        spot = key.index("".join(temp))
                        print(spot + 4)
                        return(temp)
                else:
                    pass
            temp = []
                    
                
            
                
check(lines)

def check2(lines):
    key = ''    
    for line in lines:
        for i in line:
            key+= i
    
    x = 0
    temp = []
    for line in lines:
        line = line.strip()
        for i,j in enumerate(line):    
            four = line[i:i+14]
            for i in four:
                if i not in temp: 
                    temp.append(i)
                    if len(temp) == 14:
                        spot = key.index("".join(temp))
                        print(spot + 14)
                        return(temp)
                else:
                    pass
            temp = []
                    
                
            
                
check2(lines)

