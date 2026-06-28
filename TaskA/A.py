def solve():
    print("=== Task A ===")
    print("Please enter the number of test cases t, then press Enter: ", end="", flush=True)
    try:
        t = int(input())
    except ValueError:
        print("Invalid input for t.")
        return
    results = []
    for i in range(t):
        while True:
            print(f"Please enter x and n for group {i+1} (separated by space), then press Enter: ", end="", flush=True)
            try:
                x, n = map(int, input().split())
                break
            except ValueError:
                print("Invalid input. Please enter exactly two integers.")
                continue
        # Core logic: 
        # The sequence alternates x, -x, x, -x...
        # If n is even, the sum is 0. If n is odd, the sum is x.
        if n % 2 == 1:
            results.append(str(x))
        else:
            results.append("0")
    print("\n--- Output Results ---")
    print("\n".join(results))
if __name__ == "__main__":
    solve()