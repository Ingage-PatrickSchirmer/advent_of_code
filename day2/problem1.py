oppElf = ''
mine = ''
rounds = []
with open('input.txt') as f:
    lines = f.readlines()
    for line in lines:
        rounds.append(line.strip())
        
score = 0
throw_points = 0
game_points = 0
for round in rounds:
    oppElf = round[0]
    mine = round[2]
    if oppElf == 'A':
        if mine == 'X':
            throw_points = 1
            game_points = 3
        if mine == 'Y':
            throw_points = 2
            game_points = 6
        if mine == 'Z':
            throw_points = 3
            game_points = 0
    if oppElf == 'B':
        if mine == 'X':
            throw_points = 1
            game_points = 0
        if mine == 'Y':
            throw_points = 2
            game_points = 3
        if mine == 'Z':
            throw_points = 3
            game_points = 6
    if oppElf == 'C':
        if mine == 'X':
            throw_points = 1
            game_points = 6
        if mine == 'Y':
            throw_points = 2
            game_points = 0
        if mine == 'Z':
            throw_points = 3
            game_points = 3
    score += throw_points + game_points
    
print(score)