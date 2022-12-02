oppElf = ''
result_needed = ''
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
    result_needed = round[2]
    if oppElf == 'A':
        if result_needed == 'X':
            score += 3
        if result_needed == 'Y':
            score += 4
        if result_needed == 'Z':
            score += 8
    if oppElf == 'B':
        if result_needed == 'X':
            score += 1
        if result_needed == 'Y':
            score += 5
        if result_needed == 'Z':
            score += 9
            
    if oppElf == 'C':
        if result_needed == 'X':
            score += 2
        if result_needed == 'Y':
            score += 6
        if result_needed == 'Z':
            score += 7
    
    
print(score)