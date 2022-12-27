import numpy as np

with open('./day8/input.txt', 'r') as f:
    lines = f.read() 
    
 
def get_score_for_direction(trees, tree_height):
    if all(tree_height > tree for tree in trees):
        return len(trees)
    for index, value in enumerate(trees):
        if value >= tree_height:
            return index + 1
 
 
def part_one():
    lines_list = lines.split("\n")
    forest_height = len(lines_list)
    forest_width = len(lines_list[0])
    forest = np.array(list(lines.replace("\n", "")), 'uint8').reshape(forest_height, forest_width)
 
    tree_height = -1
    # First count the edge trees
    trees_visible = 2 * forest_height + 2 * forest_width - 4
    # Iterate over the remaining inner trees
    for row in range(1, forest_height-1):
        for col in range(1, forest_width-1):
            tree_height = forest[row][col]
            up = forest[:, col][0:row]
            # Tree visible from the top?
            if tree_height > np.amax(up):
                trees_visible += 1
                continue
            down = forest[:, col][row:][1:]
            # Tree visible from the bottom?
            if tree_height > np.amax(down):
                trees_visible += 1
                continue
            left = forest[row][0:col]
            # Tree visible from the left?
            if tree_height > np.amax(left):
                trees_visible += 1
                continue
            right = forest[row][col:][1:]
            # Tree visible from the right?
            if tree_height > np.amax(right):
                trees_visible += 1
                continue
    return trees_visible
 
 
def part_two():
    lines_list = lines.split("\n")
    forest_height = len(lines_list)
    forest_width = len(lines_list[0])
    forest = np.array(list(lines.replace("\n", "")), 'uint8').reshape(forest_height, forest_width)
 
    max_score = -1
    # Iterate over the entire forest
    for row in range(0, forest_height):
        for col in range(0, forest_width):
            tree_height = forest[row][col]
            score = 1
 
            # Check upwards
            up = np.flip(forest[:, col][0:row])
            score *= get_score_for_direction(up, tree_height)
 
            # Check downwards
            down = forest[:, col][row:][1:]
            score *= get_score_for_direction(down, tree_height)
 
            # Check left
            left = np.flip(forest[row][0:col])
            score *= get_score_for_direction(left, tree_height)
 
            # Check right
            right = forest[row][col:][1:]
            score *= get_score_for_direction(right, tree_height)
 
            max_score = max(score, max_score)
    return max_score
 
 

print(part_one())
print(part_two())
 
 
