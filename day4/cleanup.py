with open("./day4/input.txt") as f:
    lines = [x.strip() for x in f]
 
complete = 0
overlap = 0
 
for line in lines:
    parts = line.split(",")
    e1 = [int(x) for x in parts[0].split("-")]
    e2 = [int(x) for x in parts[1].split("-")]
    s1 = set(range(e1[0], e1[1]+1))
    s2 = set(range(e2[0], e2[1]+1))
    l = max(len(s1), len(s2))
    s3 = s1.union(s2)
    s4 = s1.intersection(s2)
    #checking to see if the total length is the same as the longest section
    if (len(s3) == l):
        complete += 1
    #totaling the points the sections intersected if there is any
    if (len(s4) > 0):
        overlap += 1
 
print(complete)
print(overlap)


