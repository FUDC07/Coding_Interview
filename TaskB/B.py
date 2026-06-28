def solve():
    print("=== Task B ===")
    print("Please enter the number of test cases t, then press Enter: ", end="", flush=True)
    try:
        t = int(input())
    except ValueError:
        print("Invalid input for t.")
        return
    results = []
    for i in range(t):
        # Use a while loop to ensure valid input
        while True:
            print(f"Please enter the total number of thrusters n for test case {i+1}, then press Enter: ", end="", flush=True)
            try:
                n = int(input())
                break
            except ValueError:
                print("Invalid input. Please enter an integer.")
                continue
        # If n is odd or n < 4 (n=2 is even but cannot be formed by 4 and 6)
        if n % 2 != 0 or n < 4:
            results.append("-1")
            continue
        # The equation can be simplified to 2a + 3b = n/2
        # where a is the count of 4-thruster vehicles and b is the count of 6-thruster vehicles
        N = n // 2
        # Calculate max number of vehicles: use as many 4-thruster vehicles (A-type) as possible
        # If n % 4 == 0, all are A-type. If n % 4 == 2, use one 6-thruster (B-type), rest are A-type.
        # In both valid cases, the total max count is n // 4
        max_val = n // 4
        # Calculate min number of vehicles: use as many 6-thruster vehicles (B-type) as possible
        b = N // 3
        rem = N % 3
        if rem == 0:
            a = 0
        elif rem == 1:
            # Remainder 1 cannot be divided by 2.
            # We "return" 1 B-type (3 units) to make 4 units, which fits exactly 2 A-types
            a = 2
            b -= 1
        else:  # rem == 2
            # Remainder 2 exactly fits 1 A-type (2 units)
            a = 1
        min_val = a + b
        results.append(f"{min_val} {max_val}")
    print("\n--- Output Results ---")
    print("\n".join(results))
if __name__ == "__main__":
    solve()