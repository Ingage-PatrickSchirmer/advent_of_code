forest = []
with open('./day8/input.txt') as f:
    lines = f.readlines()
    for line in lines:
        line = line.strip()
        forest.append([line])
        

       
class Tree:
    def __init__(self, row, height, id):
        #self.top = top,
        self.row = row,
        #self.right = right,
        #self.bottom = bottom,
        #self.left = left,
        self.id = id
        self.height = height,
        self.visible = False,
    
    def checkTop(self):
        r = self.row
        x = self.id
        for i in range(r):
            if self.height < forest[r - (i +1)][x]:
                self.visible = False
                return(self.visible)
            else:
                self.visible = True
        return(self.visible)    
    
library = []
def buildLibrary(forest):
    for i in forest:
        for j in i:
            j = Tree(int(forest.index(i)), j, int(i.index(j)))
            library.append(j)
    return(library)
            
buildLibrary(forest)

seen = 0
# for i in library:
#     if i.checkTop() == True:
#         seen += 1
#     else: 
#         pass
    
#print(seen)
print(forest.index(library[8].id))