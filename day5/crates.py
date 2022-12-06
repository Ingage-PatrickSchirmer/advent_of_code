from collections import deque 

with open('./day5/input.txt', 'r') as f:
    read_data = f.read()
    
    rows = read_data.splitlines()
        
    stacks = {}
    
    for row in rows:
        
        if "[" in row:
            for index, char in enumerate(row):
                if (not (char == '[' or char == ']' or char == ' ')):
                    #columns are comprised of 4 spaces, therfor 
                    stack_index = (index -1)//4 + 1 
                    if (str(stack_index) not in stacks):
                        stacks[str(stack_index)] = deque([])
                    stacks[str(stack_index)].appendleft(char)
        elif 'move' in row:
            row_split = row.split(' ')
            from_stack = row_split[3]
            to_stack = row_split[5]
            quantity = row_split[1]
            for i in range(int(quantity)):
                stacks[to_stack].append(stacks[from_stack].pop())
    
    print('part 1 :' + '\n')
    for i in range(len(stacks)):
        stack_key = str(i + 1)
        print(stack_key, stacks[stack_key][-1])
        
        
print('-------------------------------------------------')
print('part 2' + '\n')        
        
        
        
        ###################################################################################################
        
with open('./day5/input.txt', 'r') as f:
    read_data = f.read()
    
    rows = read_data.splitlines()
        
    stacks = {}
    
    for row in rows:
        
        if "[" in row:
            for index, char in enumerate(row):
                if (not (char == '[' or char == ']' or char == ' ')):
                    stack_index = (index-1)//4 + 1
                    if (str(stack_index) not in stacks):
                        stacks[str(stack_index)] = deque([])
                    stacks[str(stack_index)].appendleft(char)
        elif 'move' in row:
            row_split = row.split(' ')
            from_stack = row_split[3]
            to_stack = row_split[5]
            quantity = row_split[1]
            crates_to_move = []
            for i in range(int(quantity)):
                crates_to_move.append(stacks[from_stack].pop())
            for i in range(int(quantity)):
                stacks[to_stack].append(crates_to_move.pop())
    
    for i in range(len(stacks)):
        stack_key = str(i + 1)
        print(stack_key, stacks[stack_key][-1])
        
        
        
bob = deque(['bob'])
bob.appendleft('first_name:')
bob.appendleft('smith')
bob.appendleft('timmy')
print(bob)