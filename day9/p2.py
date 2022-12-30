import numpy as np

with open("input.txt") as f:
    lines = f.readlines()


input = lines
knots = []

for k in range(10):
    knots.append((0, 0))

visited = set()
visited.add(knots[-1])

for movement in input:
    direction, steps = movement.split()
    for _ in range(int(steps)):
        match direction:
            case 'U':
                knots[0] = (knots[0][0], knots[0][1] + 1)
            case 'D':
                knots[0] = (knots[0][0], knots[0][1] - 1)
            case 'R':
                knots[0] = (knots[0][0] + 1, knots[0][1])
            case 'L':
                knots[0] = (knots[0][0] - 1, knots[0][1])
        for k in range(len(knots) -1):
            diff_x = knots[k][0] - knots[k+1][0]
            diff_y = knots[k][1] - knots[k+1][1]
            if abs(diff_x) > 1 or abs(diff_y) > 1:
                knots[k+1] = (knots[k+1][0] + np.sign(diff_x), knots[k+1][1] + np.sign(diff_y))
            visited.add(knots[-1])
print(len(visited))



