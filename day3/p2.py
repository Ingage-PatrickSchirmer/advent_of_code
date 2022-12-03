import string


pk = string.ascii_lowercase + string.ascii_uppercase


with open("input.txt") as f:
    inputs = f.read().splitlines()


total1 = sum(
    pk.index("".join(set(pack[: len(pack) // 2]) & set(pack[len(pack) // 2 :]))) + 1
    for pack in inputs
)

total2 = sum(
    pk.index("".join(set.intersection(*map(set, group)))) + 1
    for group in (inputs[i : i + 3] for i in range(0, len(inputs), 3))
)

print(total1)
print(total2)

ruck = ["".join(set(pack[: len(pack) // 2]) & (set(pack[len(pack) // 2 :]))) for pack in inputs]
# print(ruck)

r1 = [set(pack[len(pack) // 2 :]) & (set(pack[len(pack) // 2 :])) for pack in inputs]
# r2 = [set(pack[len(pack) // 2 :])for pack in inputs]

# def check(a ,b):
#     a_set = set(a)
#     b_set = set(b)

#     if (a_set & b_set):
#         print(a_set & b_set)


# for i in inputs:
#     a1 = i[: len(i) // 2]
#     b1 = i[len(i) // 2 :] 
#     check(a1,b1)
    
