with open('./day6/input.txt') as f:
    lines = f.readlines()
theHinge = [4,14]
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
            four = line[i:i+theHinge[0]]
            for i in four:
                if i not in temp: 
                    temp.append(i)
                    if len(temp) == theHinge[0]:
                        spot = key.index("".join(temp))
                        print(spot + theHinge[0])
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
            four = line[i:i+theHinge[1]]
            for i in four:
                if i not in temp: 
                    temp.append(i)
                    if len(temp) == theHinge[1]:
                        spot = key.index("".join(temp))
                        print(spot + theHinge[1])
                        return(temp)
                else:
                    pass
            temp = []
                    
                
            
                
check2(lines)

