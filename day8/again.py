forest = []
with open("./day8/input.txt") as f:
    lines = f.readlines()
    
for line in lines:
    forest.append([line])
visible = 0 
for row in forest:
    for tree in row:
        for i in range(int(forest.index(row))):
            while tree > forest[ int(forest.index(row)) - (i + 1) ][ int(row.index(tree)) ]:
                continue
            else: 
                break
            
print(visible)
                