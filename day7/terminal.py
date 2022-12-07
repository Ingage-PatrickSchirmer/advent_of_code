with open('./day7/input.txt') as f:
    lines = f.readlines()
    
    
dirs = {}   
current = ''
temp = ''
for line in lines:
    line = line.strip()
    if line.startswith('$'):
        c = line.split(' ')
        if c[1] == 'cd':
            current = c[2]
        if c[1] == 'ls':
            pass
    if line.startswith('dir'):
        d = line.split(' ')
        dirs.update({current: {d[1] : {}}})
    if int(line[0]):
        s = line.split(' ')
        if int(s[0]):
            dirs[current] = int(s[1])
            
print(dirs)