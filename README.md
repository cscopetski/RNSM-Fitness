# RNSM-Fitness ([rnsm.fit][website])

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#summary">Summary</a></li>
    <li><a href="#technologies">Technologies</a></li>
    <li><a href="#future-development">Future Development</a></li>
    <li><a href="#developers">Developers</a></li>
  </ol>
</details>

## Summary
[RNSM Fitness][website] is a fullstack fitness application that provides users the ability to track nutrition and diet progress. The initial version of the application was developed in an agile development environment over the course of eight 1 week sprints. The fullstack application consists of a ReactJS UI that makes requests to the NodeJS backend API to retrieve and update data from the databases and/or provide services to the users. Both the front and backend are hosted on an Ubuntu 22.04 VPS provided by Digital Ocean. 

The final database design diagram can be viewed [here][final-db-diagram]

## Technologies
#### Frontend: 
<ul>
  <li>React - create dynamic/functional ui components and pages</li>
  <li>MUI - utilize industry components</li>
  <li>Javascript - handle frontend logic</li>
  <li>ExpressJS -  serve content to users</li>
</ul>

#### Bundling:
<ul>
  <li>Webpack - Bundle our react project</li>
  <li>Bable - Makes our frontend backwards compatible with older javascript environments/browsers</li>
</ul>

#### Backend API:
<ul>
  <li>NodeJS - js runtime environment</li>
  <li>ExpressJS - expose api endpoints and manage middleware</li>
  <li>Javascript - handle business logic</li>
  <li>PassportJS - Authenticate users and manage user sessions</li>
</ul>

#### Database:
<ul>
  <li>Knexjs - Create efficient database queries with pooled connections</li>
  <li>MySQL - Database to manage application data</li>
  <li>AWS S3 - Store our user’s profile pictures, later retrieved through CloudFront</li>
  <li>AWS Cloudfront - Used to serve user’s profile picture aswell as caching it for quick acess</li>
</ul>

#### Networking & Hosting:
<ul>
  <li>VPS provided by Digital Ocean - Used to host our frontend and backend servers aswell as our MySQL database</li>
  <li>Nginx - Reverse proxy rnsm.fit domain to port where frontend is being served</li>
</ul>

## Future Development
In future development cycles we hope to implement external API access to the USDA food database to allow users to lookup nutriton information on a large variety of foods. We also plan to implement group challenges and a friend system to encourage users to achieve their fitness goals with friends.

## Developers
[<img width="22px" src="https://cdn-icons-png.flaticon.com/512/270/270798.png" />][calebgithub]
**Caleb Scopetski**

[<img width="22px" src="https://cdn-icons-png.flaticon.com/512/270/270798.png" />][ethangithub]
**Ethan Ferrabelo**

[website]: https://rnsm.fit
[ethangithub]: https://github.com/eferrabelo1114
[calebgithub]: https://github.com/cscopetski
[final-db-diagram]: https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&layers=1&nav=1&title=Sprint%209%20ERD.drawio#R7V1be9o4E%2F41uYTHlnzSZdOku9tNt%2F3a3ba7NzxOcMD7OZgak0N%2F%2FdqJBbakEMUYzShtbgLCgJmZdzRnHdHXV7e%2FFPFy%2Fi6fJtkRcaa3R%2FTkiBDP97zqX71y97BCAtKszIp0%2BrDmbhc%2Bpd%2BTZtFpVtfpNFl1LizzPCvTZXfxIl8skouysxYXRX7Tvewyz7rfuoxnibTw6SLO5NUv6bScP6xGvrNd%2FzVJZ3P%2Bza7TvHIV84ubhdU8nuY3rSV6ekRfF3lePjy6un2dZDX1OF0e3vfmkVc3N1Yki1LnDez9v1%2B%2Fvnkf%2F5bdvi2%2BfD5l8afVqPmUVXnHf3AyrX5%2F83SRL6p%2Fx0W%2BXkyT%2BmOc6llelPN8li%2Fi7CzPl9WiWy3%2Bm5TlXcO9eF3m1dK8vMqaV5PbtPzavL1%2B%2FHfr8clt%2B8kdf7Ioi7uv%2FO31k7%2FbT7Zvun%2B2fdf0Vc3z7a1XK2%2FSLGtel0nGf3%2B%2BLi6SHXQKG9GLi1lS7riuvqq%2BsKZi6xsajvyS5FdJdcPVBUWSxWV63ZWyuBHW2ea6LT%2BrBw1Ln8Fe8pO9w7KXomIvxc5eZ8yo32axMw4J25PN91d%2FSIq0ImJSmOO9h4r3nsR7WEb7diE5wsVNHw7JY%2BL30NUthvfk8ariUcmvyJfJgq8ZlQMWoZKDAFAOwqfkQEMt95ATJHIQDC0HzVs%2F5Gl1z8RpXKIRbdyBxiEKuKPDP%2BLhTpt3CdK0uY3%2BAtbQ4zrO1s1P%2BGtVbaKi1N3M0zL5tIzvaXtT%2BXZdAYqzdFbx6eSi4ke9BT%2FOoOukKJPbnRTlr0Zdyvhh8%2Fxm63dtvKt5y%2BfynMeZsBcYI6NgdDtg1NTJzhGKXZdpoixEpWyZhIVlvFrd5MVUZnyWpctVTTIAZBBBZYADg%2BssAGS4T%2BBCc496Fm7648LlISvjwFDvPqKODRyzuw%2BnRwtyyVWcZrjxRsHxZjaO09mJ7MIb%2FYk3FT1aeLtMi1W5iK8S1JgLXXDMyQEWLJjDZfu5vpXGH7%2FtFjSy2AZk%2BODIMBuksNkvcnXDDwEycMhhgka0MEODReDQsC1kwKN%2BMOjQDRtgQ4ccOLixAB0eNDqI2bDBFhE2JrKIbugAGTiI7OLHF9XXpuXdJEuuE2S%2BvuihuQ48TIhEwXTIiORlvig55rxhqDjaUKghowdPRdn1vSiSuEymkxiZoh5Rt07CdugH7v%2FycocW%2FdbLKUr6BYLsBeC0M5vOf058XGkEwm1ygeYmh2yPCyRszCqSKPKoMLjgGVQHHAihUSBYbvFFmmDAZvFFMhryOJtg9IkQWnuyM1mXpA9HtWm8mt%2BDyx2GhEIBCyVk7APTkN9Si4bT%2FByX5IWCkQKumylg7b9urKpbSgammSmxUzPz%2B277QHGWF2kyqTU0LoBQr4uQCNyMp3J9%2FYCmCotIFxKRrr3iuEE3hutET0JDUTL%2FZPK%2B%2BvrhyuypZymGZD%2F4%2BN1HXNARIr0ReIqQwjnAffMgcGkQqusEY0OG7AUfv%2FsNNzIYODIs8IiRNOVxq%2F7pziw2NC7U1Vyi6%2BN5ZMwctv0Lu5%2F48Aul4i65SozWTTg0iljgURb4UdD5GsLCscOIzxiJiOP7pPstBy4ho2ZT2s7zxbUypYjXVeZhSPYUW6AmQy5hBxdlj9WZ%2F7aY%2BdVSRHpKsF8Zoc6jEuw5XvUymAQzOGPEshCkp6tykZkinhwAeog%2BIvRzRwRdDNIzHAqyOkzvaQeDBm8p3I%2FJcjDoJE6zu8lZPpPYD4ALJpQQhA50WNkzPF%2BhAwvdRG6rgA82SOrpBni4IGLBhRzgwRskdR2pOQkcJYZnF%2FRBCZI8gqcb6cEGETnSwyFSJKt1Vq6QocTFhxLIuI%2F2XkKw7CW6pRDYgCKXQiyLvEzSBU6ghGJ%2FIjxOzDrr%2FXCCAyS%2BrrOODCS%2B7KxzkOAzuAJ0CPGtcNZDJN46jzVaBxLZW7%2BMS5y7iOSUhOATSnxI192uNJtvqd%2Fuy357jRB8W4jkjSCAB6TPrruHIIGHpT67r%2FLZi3OcO4hoZSFAiAV1GqK%2FDggSS%2F11X%2FbX70GCbxMRPXUECDHsqbfx0a9%2BvAWXpxHSTCIdCiEB2CS4%2FebRGmrZP1BRZp8CUS0ef8tHZ2%2F%2FOb87mX%2BZ%2F%2FmZpcUpjUa6LB5eCaqrcgIm6Azel%2FpEec9QhTdc5ttTZGLZ8ljN42X9sJjnV%2Bfr6taOl626q2a1VYoFoX59oceYqkbNEIX6DQ6lfgMCaKBoJxSQ5BMC3bmAyOyTQB5i0NQ1oTTjN40HPFgKXsIRmJ3iN4SRAteIEOhO8sOGEnmUXz2oYkBsHGBkiusKYIGvdwrkkAHaKkqGT9XIM%2FN%2BTeKsnE8%2BFPllmsnyiGDcESPQbmQA2F%2FQU0MDjswLLB2Zx%2B%2F7kZzvpKjuIcelYcR%2BZPj5eeFuZ3yLitPt6pC%2Bee8K7IFjKSHRBAEuDIS7E%2FeG2fcMZ0zJvj6OoQGWD6%2F31LEVsRcw4hrOUGyFE%2BQFxFZcYTRKqFK0RmMrIeDBito2ydhxhDEQnkZ8u3z%2BHIg9UGvpzIdQ1RLQpIWsMFXAhwuFgAca9rDp4TKnoaXDH0I5VsCrb6xACPio%2BBBzgcHBpH3w0zb1rDMmmgqHPmVRrivAOjwX4UjEELCyAAgYnAkvHRj8d1owlZviA0YEWfr%2FVM4XfCaFNziG9mMW2cmsQ4V7XsRItEg3X4%2FMKo7kfH26SMsU6TTkkRB5gc8GRYpTByoCIqtzqPgsTk%2Bi8JuDnAXnxxnX1SJJOSnz%2FycLZJQMXImUnmp8pW%2BUlLJzqyLlJLldpvfOLjaqRp4eVZlRqpr2eInNY4Yi3UxvhGvMUGQ4n99k4188l31cXJbz%2BR%2B4hvxYa0hJCEA2FyapQR%2FcxNl822HGittcpst0XT02%2BMRXXZZeXq%2F%2FvCTvkq%2Bf4iyKZ6%2Fo55Ns5MocxZcvxOLbqZispCoyHhuOvfwYPB48H7CXamZydPL0Kk6zyet5vFAcyoNkTwvADwtkVswkwdIty4juNocrosnvuwWP5B4elfiml%2BnFvSdsoWscqJLBRl1jZsG4EjwzfZhuWRE2%2FMjBzcfwgww0iiidEjRGo3QMsMbIPotMt84IG2bkUKytda4jL5BRpKrUM1rrygxHZe1Gke6ckwjMeT27eft5%2FfbdzKFfbn97%2F37y%2FTW5HMmGmzMeq232s%2Fg8yZ4AQy3z1XaVvWpeuEqn04f0dbJKv8fn959XU3pZ15Hc%2Fxj%2F%2BMg%2FUdJ%2Bp1Re5ItFclE2H3m0Oc9JH3XO2I14v%2BqexTOboUD8LfnlJQ91Dlwnw%2BQCspek9nyVx2pW7ckB7EVyM7m3x5AZX6EbifQLVVNID2V8KTWKXOiAR6O4Q%2BmOCvC16DqbP7e7edMBqKsONhqqgDzQBttns9falJXEUkRT1EQ1VHysUnibwsfh28PUNDE8t%2BnHECBDvYUjz5cFSNTkhxYgYkaAFIzudaaHGadgL%2FHhH4gkoWX4WDx7CjX2YvLwBzjqMvmPk9L%2FfT5581e4yoov3vn%2F1rPJ5nYOUmvQUc5hL18eEz%2BVBBz%2BbNm9QCs78m%2FyfCrxGMJNoVTetFyTmUklwTB32WHTcfgHwe%2B6bQt67cShVZHJoVVK2gUH3B6sxgL%2BUXi7btuC9jpxViQ8FhSzwJHSbsQURQwUequVI6pY9bCKfj6Dpp8rK2Nj55Rj7hBUE0u3QxAuE7fzvi3VMr7JNjc1Ac1WfViOEl2THhtK7LHplSgxOX9pZ6jaBjUTCLN5EEQNXHvmtyjIp%2Br0NEq%2Bza9otcHLQar%2BZDvAOO6RJ%2Fd0b04%2FgSOkofH1B3K%2F%2B4QC%2Bm92RGES7gqiItnriCGDptUHQTqDI0fO2HH3PRkpUU6WPNSMWG3%2B4xoLvPO2X0CpVyAVKpk8JkedjzN7AEg%2Fd0HoTALMioV2qlDZ2l3EV0MeADKEheGLhtqmIg3MvqDEKDqs6U5XS5liVoMN4JDjspfonBjqi9gAD2fzGxCGQGMbRUUkyoF7z57ZQHZPrUKp1w3TOWRfd0dlA%2FfXN1SRg7RA31A5B7lKiut0MZusalbigo8nwQc8wu1Z19cItiVz5pmHyCOVu24kuUCb6TCGKnc9syVPQyRInnMu89A1T3YGjTxFGjHO8iJNsNknitbxkQuea%2FdMFz8bnqS8p3ePK0Lmy5Z4c3gcMlknjmBMbI42MiHop8X3D2vv%2FOPx9e%2FzPz%2B%2Fd%2FPZHzf8THJzweWwr7du9pQxJbGIjA8zAWS1NUHdrjhtnOQnLAl56n9AxiFl27%2FOx%2FohGfMxC8MfA7CL0C8g5E0duIC3krSGJgnZ1vinpJViP1ReN3hxjBqmoTCO3SNk7GshfihcGk43%2FxDCY6jrOBSOK%2FEC08IDF7ZA3DG6l%2Bjw%2Fd%2B8Hf4tH529%2Fef87mT%2BpbodlhanNBq5BIzDqEcF6fJYfYIJWFfwrttuz%2FXGc3o9E%2FwryjY6DszBsqdrxHWEWDcN4clnT9OI6zxunsG593JoBHul5fYcNS6GGOhoKE5iXZmQmlqKQMmu3QTJ3sZvuwWWabK6KNIlvjnFkaBsCAvBQWJqqJB1mSU1tVwrQaKq3b%2FAhg7R2aUUfgshhr0j0yml%2FXYCfiESV1bmFSq3Ndy3HF%2BLo2onX2YoaA5EOLA4EKsphstU7CLHC8hU%2BIFASabQmIdKVShpayrarFG116PQuD%2FEFCUnu7Jkh4ZYEHVTWBLDDw0xwLkHPYxKIzNpdOVGTVCwswLVt232cJM2f3WLgY271Xvxlw6uGPbjr7RFnsRpdjepJ9NNzvKZxH0Id1owI8z2mCvJJgeOr5IY2exxV2pZMjnZQK3cMAchdC2NrrX%2FlLHfX6O4ivMq1P7Q4FmoR8x5oVxmc9zMc0uaPCECIH3QoY0Wa%2BpsdtfVPUO8%2B4sh9yrQlOkHTwjPcJUSOw00i7I2LBBruFWVbkZ3AvLzPPlDbAVgR7KqmfzzOPmD7PcBKi5TyI7RF8tkiisOoBiqtXUUJf5DeDtM3OPAnUQCFztBPe1Q28zcKYlIgLE5mMr%2BJMMoFOMsqhknRrMMpmaowUBo4OyfqmhhV9APC4JeTprOk8Y5wiNIPoP3iARZ9bXH6%2BrBrH5Q%2B68PS9VXbFZl5EFGM%2BVRKeDRTB7Kb5ekxSWyIRmS729ywOhOy7ZFtm%2FreFGm5R0u0kkmJTFJu50nGrWDT6vJdbpKzxVV%2FsAj0xTjNA7YUl09LfK8bAf7qt85f5dP6wNMT%2F8D
