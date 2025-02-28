---
title: "Instantly Gain Your Users' Trust with Password Breach Detection in Signup Forms"
date: "2025-02-01T00:00:00Z"
draft: false
tags: ["security", "reactjs", "go", "haveibeenpwned"]
author: "Indra Susila"
image: "images/password-branch/security-pawned.png"
description: "adding extra feature at signup forms validation with Password Leak Detection"
---


> 1. This is a "casual" article that talks about how data breaches can be used as opportunities, based on how various tech industries are already making use of them.
> 2. An in-depth technical guide on implementing a password breach checker for web applications using ReactJS and Go.

## Introduction

At present, not all users in the digital era **"realize the risks"** of data breaches. This is understandable, as not everyone pays attention to cybersecurity—even software engineers.

**But** when it comes to passwords, it’s a completely different story.
It doesn’t matter if someone is tech-savvy or not—passwords will always be a special concern for users.
Even if they’re used to logging in with Gmail, they'd still freak out if their password got leaked.
Why? Because passwords are deeply personal.

For example, even if you don't use personal thing for your passwords _(which is good)_, you'll still tend to pick something memorable—
whether it's a special character, a favorite anime character, or a combination that you hope will keep playing in your mind for years, maybe even for life.

<!-- ![thumbnail](thumbnail-security-pawned.png '') -->

## The Hidden Role of Data Breaches in Password Checks

Data breaches have been happening for over a decade, affecting major companies like Adobe, Twitter, Facebook, Gmail, Canva, Tokopedia, and more.
<sup>[[source](https://haveibeenpwned.com/PwnedWebsites)]</sup> <br>

While web security becomes more complicated, some developers take advantage of data breaches and use them for extra features as a warning
"the user data has been exposed". It is advised not to reuse it for security reasons.

### haveibeenpwned (HIBP)

As far as I know, the only publicly accessible source for data breaches is [HaveIBeenPwned](https://haveibeenpwned.com/) _(CMIIW)_.
In fact, almost all paid security services are integrated with it.
HaveIBeenPwned allows to search across multiple data breaches from various domains.
It was created by [_Troy Hunt_](https://haveibeenpwned.com/About), a cybersecurity expert who also serves as a Microsoft Regional Director.
To date, more than 1 billion breached passwords have been collected and integrated into services like 1Password,
Mozilla, GitHub, and many others,

![havaibeenpawned online](/images/password-branch/hbip-screen.png "haveibeenpawned online tools, you can try for yourself at [this](https://haveibeenpwned.com/Passwords)")

I believe that password breach checking has the potential to make a deeply positive impact on users personally.
It can positively influence user behavior,
enhance the user experience, and address psychological concerns.

Some people may be triggered when they realize their password has been exposed,
especially if they've been using it for years.
When your platform advises and forces them to change their password because it’s compromised and unsafe,
if you make a positive impression at that moment,
they will certainly feel greatly assisted and may even update their password on other platforms. And that means,
it’s not just the new password they will remember, but also your product.
and **That’s it**. That is the expected behavior.

{{< notice "info" >}}
this is just my personal opinion, and I don’t have many sources to back it up.
{{< /notice >}} 



![github using password breach detection](github-hbip-ss.gif "Github is already using password breach checking <sup>[[source](https://github.com/signup)]</sup>")

### Pragmatic Analysis

In another case, if you're familiar with _Hostinger.com_ (a cloud hosting provider),
you'll notice that there's no data breach checking during signup on that domain.
However, if you buy the product from Hostinger Indonesia (hostinger.co.id),
you'll find that password breach checking is applied.
It’s interesting to see this difference: <br>
while both domains belong to the same company, but Indonesian domain offers an additional feature.

![hostinger data check](hostinger-id-check.png "_hostinger.co.id_ is already using breach checking <sup>[[source]](https://www.hostinger.co.id/)</sup>")

In my opinion, Hostinger has really played its role well in Indonesia.
If you're truly aware of the situation in Indonesia, you'd know that over the past 3 years,
many incidents related to cybersecurity and data breaches have occurred.

{{< chart id="breachChart" type="'line'" options="{}" >}}
{
"labels": ["Q1 2021", "Q2 2021", "Q3 2021", "Q4 2021", "Q1 2022", "Q2 2022", "Q3 2022", "Q4 2022", "Q1 2023"],
"datasets": [
{
"label": "Indonesian Data Breach",
"data": [1339.4, 699.47, 1581.16, 492.16, 430.18, 902.14, 13260.29, 251.07, 89.11],
"borderColor": "rgb(255, 99, 132)",
"backgroundColor": "rgba(255, 99, 132, 0.2)"
}
]
}
{{< /chart >}}

<p class="text-xs text-center">
  indonesian data breach by <bold><a href="https://www.statista.com/statistics/1411281/indonesia-quarterly-number-of-data-breaches/" target="_blank">statistica</a></bold>
</p>

The chart above shows data from 2021 to 2023,
and Indonesia has seen a significant rise in data breaches
<sup>[[source](https://www.cyberlands.io/topsecuritybreachesindonesia)]</sup>,
To make matters worse,
the Indonesian government has faced serious data breach issues since July 2024 .
<sup>[[source &](https://www.reuters.com/world/asia-pacific/indonesias-tax-agency-probes-alleged-personal-data-breach-2024-09-19/)]</sup>
<sup>
[[hot news](https://x.com/secgron/status/1836296102011941348)]
</sup>

The logical consequence of this chart is that data breaches in Q2 2024 should show a noticeable increase,
making this case even more relevant and offering an opportunity to take advantage of the situation.

{{< notice "info" >}} 
again, this is my personal opinion, and I don’t have many sources to back it up.
{{< /notice >}}



## Technical Implementation

We will use **HIBP** as a dataset library, and so far, we can do it in two ways:

1. Using the [HIBP API](https://api.pwnedpasswords.com). It's free to use, but has a rate limit. **or**
2. Self-hosting HIBP,
   we need to download the password breach list and host it on our server.
   <br>

For privacy reasons, HIBP uses [K-Anatomy](https://epic.org/wp-content/uploads/privacy/reidentification/Samarati_Sweeney_paper.pdf).
this means that the password is not sent to the server in plain text.
we need to hash the password before sending it to the server. The password is hashed using the **SHA-1** algorithm.

In general, the flow is roughly like this.

{{< mermaid >}}
sequenceDiagram
autonumber
box rgb(248, 255, 240) Frontend
actor User
participant Frontend
end
box rgb(245, 251, 255) Backend
participant HIBP_API
participant HIBP_Database
end

    User->>Frontend: Enter plain text Password
    Note right of User: sukses100%

    Frontend->>Frontend: Hash Password (SHA-1)
    Note right of Frontend: 7a58a286641ec6

    Frontend->>HIBP_API: Send First 5 Characters of Hash (Prefix)
    Note right of Frontend: 7a58a

    HIBP_API->>HIBP_Database: Query Prefix

    HIBP_Database-->>HIBP_API: Return list of Matching Hashes
    Note left of HIBP_Database: 7a58a286641ec6:2
    Note left of HIBP_Database: 7a58aa8664112d:1
    Note left of HIBP_Database: 7a58ab86641ec1:7

    HIBP_API-->>Frontend: Respond with Matches as suffix list
    Note left of HIBP_API: 286641ec6:2
    Note left of HIBP_API: a8664112d:1
    Note left of HIBP_API: b86641ec1:7

    Frontend->>Frontend: Compare Full Hash Locally
    Frontend-->>User: Notify if Compromised

{{< /mermaid >}}

1. The password is **sukses100%** as a plaintext, and

2. Frontend is hashed into a SHA-1 hash like:

{{< highlight bash >}}
7a58a286641ec6
{{</highlight>}}

3. The first 5 characters of the hash (called the prefix) are extracted as **7a58a**.
   this prefix is sent to the HIBP API to query for possible matches.

4. The HIBP API server sends a prefix query to the HIBP database to find matching hashes.
5. If a match is found, the HIBP database returns a all hash list of matching hashes with **pawned counts** info.
   pawned count is The numbers after each hash, represent the number of times that password was seen in breaches.
   example response:

{{<highlight bash >}}
7a58a286641ec6:2
7a58aa8664112d:1
7a58ab86641ec1:7
7a58aj86641ec1:5
7a58ag86641ab3:10
7a58al86641123:14
{{</highlight >}}

6. The server receives the matching hashes and filters them to send **only the hash suffixes** to the frontend, ensuring privacy.
   example response:

{{<highlight bash >}}
286641ec6:2
a8664112d:1
b86641ec1:7
j86641ec1:5
g86641ab3:10
l86641123:14
{{</highlight >}}

7. The client receives the list of possible matches and compares the suffix hash of the user's password to the list of returned suffix hashes.
8. If a match is found, the user is alerted that their password is compromised and should be changed.

## Frontend Implementation (Reactjs)

{{< mermaid >}}
sequenceDiagram
box rgb(248, 255, 240) Frontend
actor User
participant Frontend as Nextjs/Remix
end
participant HIBP_API

    User->>Frontend: Enter plain text Password
    Note right of User: sukses100%

    Frontend->>Frontend: Hash Password (SHA-1)
    Note right of Frontend: 7a58a286641ec6...

    Frontend->>HIBP_API: Send First 5 Characters of Hash (Prefix)
    Note right of Frontend: 7a58a

    HIBP_API-->>Frontend: Respond with Matches
    Note left of HIBP_API: 286641ec6:2
    Note left of HIBP_API: 286641121:1
    Note left of HIBP_API: 286641129:7


    Frontend->>Frontend: Compare Full Hash Locally
    Frontend-->>User: Notify if Compromised

{{< /mermaid >}}

To hash, send, and compare, basically we’ll be using some simple logic in TypeScript like this.

{{< highlight tsx >}}
import sha1 from "sha1";

/**
* Checks if a password is safe using the HIBP API.
* @param password The password to check.
* @returns Promise<boolean> - `true` if the password is safe, `false` if it is compromised.
 */

export async function isPasswordSafety(password: string): Promise<boolean> {

  try {
    // Step 1: Hash the password using SHA1
    const hashedPassword = sha1(password);
    const prefix = hashedPassword.substring(0, 5); // First 5 characters of the hash
    const suffix = hashedPassword.substring(5); // Remaining characters of the hash

    // Step 2: Fetch data from HIBP API for the hash prefix
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);

    // Step 3: Check if the response is successful
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} - ${response.statusText}`);
    }

    // Step 4: Extract the list of hashes and pawned counts
    const data = await response.text();
    const hashes = data.split("\n"); // Split response into individual hash entries

    // Step 5: Find the hash suffix in the returned list
    const foundEntry = hashes.find((hash) => {
      const [hashSuffix] = hash.split(":"); // Extract the hash suffix
      return hashSuffix.toLowerCase() === suffix.toLowerCase(); // Compare suffixes (case-insensitive)
    });

    // Step 6: Return true if no entry is found, otherwise false
    return foundEntry === undefined; // Safe if no match is found

    } catch (error) {
    console.error("Error checking password:", error);
    // Treat any error as a signal that the password might not be safe
    return false;
  }
}

{{</highlight>}}



we can use this hook in our component

{{< highlight tsx  >}}

// SignUpForm.tsx

import { useForm } from "react-hook-form";
import PasswordShowBtn from "./components/PasswordShowBtn";
import { password_validation } from "./schema/password_validation";
import { usePasswordSafety } from "./hooks/usePasswordSafety";

interface IFormInput {
  password: string;
}

function App() {
  const [showPassword, setShowPassword] = useState(false);

  const { status, error, isLoading, numberOfPawned, isPasswordSafety } =
    usePasswordSafety();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: IFormInput) => {
    // When the form is submitted, check the password with the API
    await isPasswordSafety(data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type={showPassword ? "text" : "password"} // Toggle antara password dan text
          placeholder="Password"
          {...register("password", password_validation)}
          defaultValue=""
        />

        {errors.password && <p>{errors.password.message}</p>}

        <PasswordShowBtn type="button" onClick={togglePasswordVisibility}>
          {showPassword ? "Hide" : "Show"}
        </PasswordShowBtn>
      </div>

      <button disabled={isLoading} type="submit">
        {isLoading ? "Checking password..." : "Submit"}
      </button>

      {/* Show result or error */}
      {status === "pawned" && !isLoading && (
        <p>
          We found this password in a data leak {numberOfPawned} times. For
          peace of mind, we recommend choosing a new one. {`${status}`}
        </p>
      )}

      {status === "safe" && !isLoading && (
        <div> your password is health</div>
      )}

      {error && !isLoading && <p>Error: {error}</p>}
    </form>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

{{< / highlight >}}

i also already provide code on [**codesandbox**](https://codesandbox.io/p/sandbox/hibp-simulation-n6wkjj?file=%2Fsrc%2Findex.tsx%3A1%2C1-74%2C1)

<iframe src="https://codesandbox.io/embed/n6wkjj?view=preview&module=%2Fsrc%2Findex.tsx"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="HIBP Simulation"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   >
</iframe>

Next up, we’re gonna keep setting up our self-hosted HIBP.
For learning purpose, we’ll roll with Go and its standard HTTP library, —it’s simpler, easier to understand, and quicker to set up.

## Backend Implementation (Go with http standar lib)

Since Go 1.22.1 was released with a [fancy HTTP standard library update](https://www.youtube.com/watch?v=H7tbjKFSg58), I personally prefer to use that instead of bringing in framework abstractions. Another good news is the performance; it's quite good. You can deep dive into benchmarking Go’s stdlib vs Gin vs Fiber in EKS Kubernetes [here](https://www.youtube.com/watch?v=ok5DDDNsOaQ&t=272s). To get the password dataset from Have I Been Pwned, you need a subscription.
You can sign up for it [here](https://haveibeenpwned.com/API/Key)..
> Without an API key, you won’t be able to download the dataset from HIBP.

Officially, we can download it using this tool

[PwnedPasswordsDownloader](https://github.com/HaveIBeenPwned/PwnedPasswordsDownloader)

**but** if you're not familiar to **#C** or **.net**, you can use alternative tools like **[python](threatpatrols/hibp-downloader)**, **[Rust](easybill/easypwned)**, **[Nodejs](wKovacs64/hibp)**, and **[PHP](oyeaussie/PHPPwnedPasswordsDownloader)** . don't worry, the process and flow are pretty much the same across the board.
And finally, you'll get a huge `.txt` file that contains the list of pwned passwords.


{{< notice "warning" >}} 
Beware! Don’t open the file with regular editors like VSCode or Neovim—it’ll take forever and might freeze your computer. You should use a specialized editor for handling huge files, like [less](https://www.geeksforgeeks.org/less-command-linux-examples/), [klogg](https://klogg.filimonov.dev/), or something similar.
{{< /notice >}}


![havaibeenpawned online](line-text.webp 'This is an example of a sliced line from the `.txt` HaveIBeenPwned list.')


### converting dataset .txt to sqlite

| Column Name | Data Type | Constraints           |
|-------------|-----------|-----------------------|
| prefix      | TEXT      | NOT NULL, PRIMARY KEY |
| suffix      | TEXT      | NOT NULL, PRIMARY KEY |
| occurrences | INTEGER   | NOT NULL              |

Using OS "file reads" in Go is still fine, but sometimes we need a more maintainable solution. I prefer converting it to an SQLite database—it’s easier to work with and quite fast. We’ll need a script to transform the `.txt` file into SQLite.

{{< highlight go >}}

import (
 "bufio"
 "database/sql"
 "log"
 "os"
 "strings"

 _ "github.com/mattn/go-sqlite3"
)

func main() {
    // Open the text file containing the password hashes and their occurrences.
    file, err := os.Open("../data/hibp_example.txt")
    defer file.Close()

    db, err := sql.Open("sqlite3", "../data/hbip.db")
    defer db.Close()

    _, err = db.Exec(`CREATE TABLE IF NOT EXISTS pwned_passwords (
        prefix TEXT NOT NULL,
        suffix TEXT NOT NULL,
        occurrences INTEGER NOT NULL,
        PRIMARY KEY (prefix, suffix) 
    )`)

    // Begin a new database transaction to batch insert data for better performance.
    tx, err := db.Begin()

    // Prepare an SQL statement to insert or ignore duplicate records into the table.
    stmt, err := tx.Prepare("INSERT OR IGNORE INTO pwned_passwords (prefix, suffix, occurrences) VALUES (?, ?, ?)")
    defer stmt.Close()

    // Create a scanner to read the text file line by line.
    scanner := bufio.NewScanner(file)
    for scanner.Scan() {
        line := scanner.Text()
        parts := strings.Split(line, ":")

        // Skip lines that don't follow the expected format
        if len(parts) != 2 {
            continue
        }

        hash := parts[0]    // The full hash value from the line
        count := parts[1]   // The occurrence count from the line

        prefix := hash[:5]  // Extract the first 5 characters as the prefix
        suffix := hash[5:]  // Extract the remaining characters as the suffix

        _, err := stmt.Exec(prefix, suffix, count) 
        if err != nil {
            log.Printf("Failed to insert record: %v", err)
        }
    }

    // Commit the transaction to finalize the batch insert into the database.
    if err := tx.Commit(); err != nil {
        log.Fatalf("Failed to commit transaction: %v", err)
    }

    log.Println("Data conversion completed.")
}
{{</highlight>}}

You need to run that script to prepare the dataset as an SQLite db.



```bash
go run scripts/text_to_sqlite.go
```

### add a simple router

{{< highlight go >}}

// main.go

router := http.NewServeMux()
router.HandleFunc("/api/v1/hibp", handler.CheckHandler(db))

{{</highlight>}}

Maybe we need a separate package to make it reusable. It will contain functions for initializing the database and finding suffixes

{{< highlight go >}}

package database

import (
 "database/sql"
 "fmt"
 _ "github.com/mattn/go-sqlite3"
)

type DB struct {
 *sql.DB
}

func InitDatabase(dbPath string) (*sql.DB, error) {
 if dbPath == "" {
  return nil, fmt.Errorf("database path is empty")
 }

 db, err := sql.Open("sqlite3", dbPath)
 if err != nil {
  return nil, fmt.Errorf("failed to open database: %v", err)
 }

 return db, nil
}

// finding suffix base on prefix
func GetSuffixesByPrefix(db *DB, prefix string) ([]string, error) {
 query := `SELECT suffix FROM hibp WHERE prefix = ?`
 rows, err := db.Query(query, prefix)
 if err != nil {
  return nil, fmt.Errorf("failed to query suffixes: %v", err)
 }
 defer rows.Close()

 var suffixes []string
 for rows.Next() {
  var suffix string
  if err := rows.Scan(&suffix); err != nil {
   return nil, fmt.Errorf("failed to scan suffix: %v", err)
  }
  suffixes = append(suffixes, suffix)
 }

 if err := rows.Err(); err != nil {
  return nil, fmt.Errorf("error iterating over rows: %v", err)
 }

 return suffixes, nil
}

{{</highlight>}}

You can implement the database package in the router handler andBasically, I just made this project more simple and similar like _[Hono/Express](https://hono.dev/)_ framework.


{{< highlight go >}}

package handler

import (
 "database/sql"
 "fmt"
 "net/http"
)

// query handler
func CheckHandler(db *sql.DB) http.HandlerFunc {
 return func(w http.ResponseWriter, r*http.Request) {
  if r.Method != http.MethodGet {
   http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
   return
  }

  // fetch prefix from url query
  prefix := r.URL.Query().Get("prefix")
  if len(prefix) != 5 {
   http.Error(w, "Prefix must be exactly 5 characters", http.StatusBadRequest)
   return
  }

  rows, err := db.Query("SELECT suffix, COUNT(*) FROM pwned_passwords WHERE prefix = ? GROUP BY suffix", prefix)
  if err != nil {
   http.Error(w, "Internal server error", http.StatusInternalServerError)
   return
  }

  defer rows.Close()

  var result string
  for rows.Next() {
   var suffix string
   var occurrences int
   if err := rows.Scan(&suffix, &occurrences); err != nil {
    http.Error(w, "Error scanning result", http.StatusInternalServerError)
    return
   }

   // Ensure only the suffix is returned
   result += fmt.Sprintf("%s:%d\n", suffix, occurrences)
  }

  if result == "" {
   w.WriteHeader(http.StatusNotFound)
   fmt.Fprint(w, "No suffix found")
   return
  }

  // returning text format as a response
  w.Header().Set("Content-Type", "text/plain")
  w.WriteHeader(http.StatusOK)
  fmt.Fprint(w, result)
 }
}

{{</highlight>}}

I also providing full source code at github, you can check it out [[here](https://github.com/susilodev/mini-hbip)]. just make sure **Go 1.23** is installed on your machine cz I haven’t finished the Podman/Docker config yet.

## Conclusion

The budget for this implementation is cheap, even you can do it for free. maybe you'll got rate limits, but it's only affects the client network as a frontend. There is no significant impact on your server, **except** when you are running a self-hosted HBIP, which might incur some hosting costs.





<br>
<br>
<br>