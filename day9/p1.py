import numpy as np

with open("input.txt") as f:
    lines = f.readlines()


#this method uses the new Match statement introduced in python 3.10

def part_one():
    input = lines

    head = (0, 0)
    tail = (0, 0)
    visited = set()
    visited.add(tail)

    for movement in input:
        direction, steps = movement.split()
        for _ in range(int(steps)):
            match direction:
                case 'U':
                    head = (head[0], head[1] + 1)
                case 'D':
                    head = (head[0], head[1] - 1)
                case 'R':
                    head = (head[0] + 1, head[1])
                case 'L':
                    head = (head[0] - 1, head[1])
            diff_x = head[0] - tail[0]
            diff_y = head[1] - tail[1]
            if abs(diff_x) > 1 or abs(diff_y) > 1:
                tail = (tail[0] + np.sign(diff_x), tail[1] + np.sign(diff_y))
                visited.add(tail)
    print(len(visited))