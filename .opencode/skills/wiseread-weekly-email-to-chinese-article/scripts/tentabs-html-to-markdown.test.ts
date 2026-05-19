import { strict as assert } from "node:assert"
import { readFileSync, writeFileSync } from "node:fs"
import test, { describe } from "node:test"
import {
  articlesToMarkdown,
  extractTenTabsArticles,
  type IArticle,
  searchTenTabsEmail,
} from "./parse-email.node.ts"
import { join } from "node:path"

describe("html to markdown", () => {
  test("extractArticles", async (t) => {
    // const html = await searchTenTabsEmail(
    //   "Why Are We Always Charging Our Phone Batteries?",
    // )

    const dirname = import.meta.dirname

    const html = readFileSync(
      join(dirname, `../assets/test-ten-tabs-email.html`),
      {
        encoding: "utf-8",
      },
    )
    // writeFileSync("./test-ten-tabs-email.html", html, { encoding: "utf-8" })

    const actual = extractTenTabsArticles(html)

    const expected: IArticle[] = [
      {
        category: "还有哪些值得看的国外新闻",
        subArticles: [
          {
            title:
              "What to know about the Ebola outbreak that the WHO has declared a global health emergency",
            url: "https://clicks.mozilla.org/f/a/0SI4v0HBIimtHZlZZlH6JQ~~/AAQRxRA~/WF0nvhUit4KHu1cUMB-7BHPwkxmZlTRlIabtatUWPsOEBdcyyypp-3EAuC8P4rgJpcDpEf4SmQVZfS0qTYoIpHLFnBbiAfA1wVJoVQxfeEBw7l3T1vwKU_3g_zUYnnAxkHHxN2YZAPXjgboBa4r45WLsPAdUA3CgmLbWAe1BobPnIgTB2JtzqOG1XeTFocJvJjCksEzR2wOkFkv0ta1K-Exy-j1FSf6SBiuU42MGulIoqF-ZQ2qigWx3aIxL6ae5l229shIY7dX7JQzFHajdZh3fjscO6K9M6SZ8OaUKHDMHOhmCLtaBMh1SC0MTFFnGuK-tYW4noi_AS13slaQnlFdhpHC08WInxcHsaf9k5Om9MPeXF6Cd0rpoCcaeXxeSVAzOgeQfmc2s6jgg8O0EoxqpDWpI4Q2Qtc4_W6ykQ7zElbjiZSI7n5jv66S9VhtVHt2tmYM6LlE3FDZ-p9NCAMtAGlJPI4-mCAwzGR3l_J0YpEZvNKOptKMzCjnYsEOuEZ0m9IEetIfsWq4R15sWpg~~",
            img: "https://pocket-image-cache.com/150x150/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Ffab264a9-a34e-48b7-a465-f450ab46b159.jpeg",
            summary:
              "The World Health Organization has declared the Ebola disease outbreak in Congo and Uganda a public health emergency of international concern.",
            media: "The Associated Press",
            author: "Chinedu Asadu",
          },
          {
            title: "Bad, Bad, Bad, Bad Roommate",
            url: "https://clicks.mozilla.org/f/a/qqO26hjDAqHtOX9RwyN5ng~~/AAQRxRA~/iofyrlU_vgWuzesIDeHKPVPzTn5KWnZcrwsssP728dY4wvR8mpD07IPdKDsoPRV9AO6lFD29IldKqUjlw1UkHdBsE1uQRWRA4NPkRsI_TuGB4UbGVLC8reZNseSPwg4UO2P1UwgnUjg9bxe3z4_Pi6IrJyHKWmmCiF8QE5sDkBfzzBXR9zgEC-qqiIfm8F1qeN_OgSS00KeQLaHFWaZRMByQNSgPNJUhYglgoYL79wEiSMIkujju9SecNPdS16wBKIrzjwk1Jv153kTWmIcI6bqNB4G3ah-ddzFOnoyhBpZbic7qMPheY9PIjlkgU4HaivXBDBJFE3hNcSCEHbfd0yH7lZjbfQFSw6Zjkcf8EHKIkSKexnEbOp1yI98m8dV_osN9ETGTWVK0UhLrE48O7Cw_yY8h8MYKl-ZXgQGXdvfUh0qdUwVc2fshEZrUvjbyG1PvufNOLhPysXLksVB6GxfszO5LL6phm7iRlJSNwDDDUVvvbA1Po-Cq84VybQkB2WU49pmKYPU2TH24HHRjsw~~",
            img: "https://pocket-image-cache.com/150x150/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fb952acfc-e01f-4bb5-ad9e-f5ec834d59ac.jpeg",
            summary:
              "How a nightmare housing situation drove a bleeding-heart progressive to home surveillance, eviction law, and calling in law enforcement.",
            media: "The Verge",
            author: "Ian Frisch",
          },
          {
            title: "Why running Britain is so hard, no matter who does it",
            url: "https://clicks.mozilla.org/f/a/Wv4PB4UVpslCmrZupJlW8w~~/AAQRxRA~/uXWou5rpKXbkT1CRNVwAEsctl7iElebVeenA8S2pJQJyRfTTStNHMWyc0Qb1RX_4GoT1rEK9-R832D0EFwBZ3L8ZV-kxgLRLohD8nLYpPR0ejnHX7w1roi6LOGACva6P8UenKUAuMeUtj5mot8Z95hEZEkFuGOAUzEQrzdsvXb3m_bCMecJ0MhtTlAeSwAMGm4bDAzmQuD8fmz_5664EDL_TAwH0VTxRFJSW5Z9S_9pnVNS2s3dGV1TLrjXVmwKurFl1fAAW5Yua6LERd_7IFBmNtYnA7qTq8PhnX7yHoVoaYO-rTcfy9h0wrEJlRaIkQBGW_w3Y_ATHH0AOpwXnWIe2VRVm8yIbADVvhO8fEYg980AAjPjxvCNEBxsByUh0BFpbqB__V7fHK8--w2oAG6oNmZ06Hdh8dDuUcORF0AOi7EVpIqK-UZxe-mgiUlpWuQBKEK77e5xNXZa13_AbgxZQvXp7D3wuRhH4JDu7eHLRdsQ19-JhbAxoiryl9Fjw",
            img: "https://pocket-image-cache.com/150x150/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2F58d35413-5c03-4f43-b075-e409dfd89579.png",
            summary:
              "In the past 10 years, six people have had the job of running the United Kingdom. All failed to turn the country around. Good luck Wes, Andy, or Angela — you’re going to need it.",
            media: "POLITICO Europe",
            author: "Charlie Cooper",
          },
          {
            title: "An HIV-free generation is closer than you think",
            url: "https://clicks.mozilla.org/f/a/LG6JfT8VB7ODikgBrHpqEA~~/AAQRxRA~/zLs0qwC8J_LpiI7PpvofelMrDgQdPzPdq0d8WT9Udzi2sEZwpnUp2-e1B5ipEP3m4olWshflTQMXpxFCjSc7NYl5knwMLOcqbbaAVu2hdZoQXdHOOuKqw5Nfy6-Ahc6wvKg6nWuRLKH-G-qpGIZQydbpc8aVV_3h9bj-iOhMPj5EtDNQ0pROPIAJAlJzXqO3ovPGmHlHIIsTq_U9w9VJ0MO_0gz9oDgwL3SED1r2CmzBoDZy_vmEUJRTboG1Bz9MRxMn9BlzhAhAALnRa6hSslkCZnAwvUVuyfY6-K3XWHfY0j83eNLkIo5-0aqcxfOpb_yekH8azq8EqFmffv0BKutSPMXCtjdnvcfrqipaUv_X97L05yT4FAuCDEymKuF2hxhEuigmM9djet6e2imRfSOlMwflz9ZU4bdBZCmjxiCvQWkv_ykM6-6KvfMDMOkYBC_bWn-LxzmHSPAZvAqRXgrbLwudI4mczO4X9j0K388~",
            img: "https://pocket-image-cache.com/150x150/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fc3f3fb9c-31bc-460e-8e4d-1d9d7f87447e.jpeg",
            summary:
              "The effort to protect babies from HIV is working. It’s also in danger.",
            media: "Vox",
            author: "Sara Herschander",
          },
          {
            title: "‘It’s felt like homework’: Why Star Wars went so wrong",
            url: "https://clicks.mozilla.org/f/a/ONqFCkcX7Y5iw8ucLV1UKA~~/AAQRxRA~/4LI58cN91er2OC5uzRykAT44nok1ggCjBEJm_esrtEogCyDAVNWgaLQKRGLXX-v837YtXvbtarz1hqyK6grsA0AfTQ0wZuTX_0tzHmDmpezQg_bnELkqk33spKeTEIxDLXdpN47h1tsdAlXLOiuTL0OW6syhaPdsvpBxxVqmtpU3j5JXgtM_QrOBhGnBLE9t0-fBb0vk21I6UMYTReUjzn23fHWeKMwr6Q-ZyOoqN8iVTAe8BzzfGPzENy11st9PGM_v38Jqi5pasXreJfT1ygmQ9riWESdCkQdFmqpBKqvAYcs_Lrbi3gGMebFjXnqQlbHC7lyncoTS1NnNXn3dxdQyRWXLLIO9EgdBSCQaVzFRgxkBDRZZ_2AxmdAoh4_y_ZMr4R1pzGj5UvgqDY5vzR8yySIB4-3yv0IrODGLOQRr7CSOZiysDZhJ9wMKr4XaV3WoeKPk9fnSRdUp9dBDA8LLSHUT7Oh1G1VXFEdtSd4~",
            img: "https://pocket-image-cache.com/150x150/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Ff0ec863a-addc-4727-bef2-c17b4ea6ba3a.webp",
            summary:
              "The Mandalorian & Grogu is released this week and is set for the lowest opening weekend of any Star Wars film ever. With the TV shows also struggling, here’s why interest is waning.",
            media: "BBC",
            author: "Hanna Flint",
          },
          {
            title:
              "Patriots hit with bizarre scheduling quirk the NFL hasn't seen in 40 years, plus 21 other schedule oddities",
            url: "https://clicks.mozilla.org/f/a/8ko3Kh-xsayp8YG6_SCObA~~/AAQRxRA~/EUJ_M-Ty8FUE5N1640Hrdw7G7IscXAuPCZRwNsFP1soLoMZjfRHXsh8TI4qHK5UIK35brvgqjVhnBFQeE7wFUKaUi1N0KhdZ0wlNosHnY1vDCMPjGODcQ-8BDpiU_jU6WmalkuMlsE2MQQAAwwbdc2WIIPYggrxXD2C-xHOH8hNVNA6PSJ66KS3g2bDl4Q8EgYFIuK-2CGvjwzWD9HquFJD23j9aUeDWxmjljfS3rjHd84IaSyidjvf2_gZAWsNkmCEVcNAnNNbephhIlwUIpDZElPif7GDBFynCcV1mN6jldznerOE8WCAIwUfdtulQ6H1GgNmmdClUq05KARY_t1ET5MOJCVfE_BOj317uuALB-a-WVXL6ykIMEBAMXUYHrccVes6R0PbkogO6hrw_ury5tiZ6Q5Uc3OHQ9702AR-S5viuIsXGdSqscY6aemAL-5o_tWS3aK57LcyX2_vSkjEvr9EA81jlsPh6fhhVKvE~",
            img: "https://pocket-image-cache.com/150x150/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2F93b9964b-79a5-4b93-b850-2a1fd3000027.jpeg",
            summary: "Some teams were given a pretty crazy schedule by the NFL",
            media: "CBS Sports",
            author: "John Breech",
          },
          {
            title:
              "Phone Batteries Keep Getting Better. So Why Are We Always Charging?",
            url: "https://clicks.mozilla.org/f/a/H2t-nW4B7PhWS4zPEJsUmw~~/AAQRxRA~/ZpJQyydrb-REHVMpeui1Hmvj0x2dN04APA5LWP8v2MCQLRGU3yo1UHFj5cxST0rDXw26VZfJxUeMVi5UILGHOFN1BfWV-zuyE1h6FrXLJU5dp8q6R8z2CoWisQwNKv-ePSXLo-jGS1NWzVZVDy04nkNBKR4NTDCOJS3mqPxbwdpAW7zUiHOt4iub0zBO6DDPY146C6JfvmqMGlyRaGnjhwe5mZvDsP029StCWqEPwPW0B-H449HhHrheKGApLK8L-WtFgvQQ0y-aBXSNSbQIWk66bzMkzWY9NHhXftZJNzQN47BVOGSzSxI1BQ5_6T0vwiurkfZAAiI3Q1TXq2pcXrHZsB7_PjPGKzEOkiganKa6pAAwJthLRsN42VnwEYrrcOafFhq_kWvxHzViP8rq9_XEK6Ez926ADLrW4OAkI28bKJveIe3rp3MPeHt72LYMR_G9jKKDKHa6_hgG39VT5DPNuX-7uycbYNmj5ksmoHSbVdQXLZy6WxkXzb5j-OzAjx5YZ82YJqny5BU2JRUGKw~~",
            img: "https://pocket-image-cache.com/150x150/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fe4769be0-d6cc-4217-b88d-7d80460b715e.jpeg",
            summary:
              "As our phones become more advanced, batteries are feeling the strain. But technology improvements and shifts in our habits could help close the gap.",
            media: "CNET",
            author: "Abrar Al-Heeti",
          },
          {
            title:
              "New Study Finds That an Essential Oil Can Effectively Ward Off Mosquitoes. Here’s What to Know.",
            url: "https://clicks.mozilla.org/f/a/0TXhlPvAcexMBtoRS6-NEg~~/AAQRxRA~/PI1QouXOQymumSRqWloiA1Yc0oII1W4FcjZTy3F3DJ8dpVHRRbJIqbzEMocnnznFE8urq30NLoJFdR3ORO6oAkosD35DEMsXq1wUODjS26W-axA0xYS7TjActKP1bZUNGtVrgNPTArGx7W3kxfljo6TgtpfnjrMBam8jdnCfkbbBLn1rbtLcPtI1FqmY_KEkJl-G2bXpDrr4TIGE2_oWs2fgnsWUWIuZKLjjiv2djSYFV8zvp3N9SyZk-XC0pkb0FgpTD7BeDJL_Km-asF4MEsAe0vT_04we8vjYn_4laIeLHb3UpD89d9xBCIky8-MkXN9nS-dZz_5eptm-eCUdZ-jQ_mtZpqrmUyvaGjNDWJxDToZt2sm0lUbZAvlY_-RKdNijbrhcBA2HWLW9Hl6_QUQRxg-LEHfd4_ZHnh6vPOysU1vEohOcpX2SBg4s_b58s4KM-jc6rQMcFMIfxDX__V93O6Vb50bxA57W_a7bW4PfeVKpUzyaIqlFzqMPDGxI",
            img: "https://pocket-image-cache.com/150x150/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fda8e13d5-bd02-4080-813f-aae2bd5b8d91.jpeg",
            summary:
              "To test it, study participants put their arms in mosquito-infested cages for three hours. Dermatologists and bug experts weigh in.",
            media: "Outside",
            author: "Korin Miller",
          },
          {
            title: "How ‘bird’ became TikTok’s favourite new dating insult",
            url: "https://clicks.mozilla.org/f/a/H7CypF9VXvcv1QbGyqTeYQ~~/AAQRxRA~/qcM_rTVBxlKkCKTiHi7edYV5Bi51_MOopMMhg662l42AIV7LcZwPCDEf-f152GeQZ4mlwotvvJnFSPJBZpHPSlD8Zk3f8Yl12mabXlDoJ3aHxEtyilJgIGQYOXLhSWBoBnqXdu8xhf-iwaD9W-ANrXqKD8BKXldN-VNe6DUQXOsLuY7ark0zR_ygVhFYvojZnU8smcMCXVMPsDVwwufHvtd25DrycNHSjou2vXS01oZqxpJnL9IcFKa0Du_PgVbuLkJHzl_1bhA5aq8jE1NYtLY0Idn9EUNvQJvyQVGwBxJWAIWfZDYmXzjBBmvOnegulHiyauUL0bXBpaaRXt1tg25EZsNmMMrleVZ6g7RfBVCLDANEFr6zoz-Omu1tHuqARcPeJgccY76Libb1I4df4r-JXTRQpMOfNeopOzzxR0Kx-IwypA1Mz74AZf0gP4zkE_4Dwt7DqVTCJ27D5PHIvw3dqJxtUz7fz_GT1dLSpw-74oBoXdRjKR1yuJB1YJGPGdUzOG-SUuRM5GOOmObHaiJtne5NiPtlKL22CegQHSoeHsPbgLpHlj8mCCqEPoeudICgGC5k6GdWoGf8ydsjOa11d0cDcXRXoylNCCSZP0pyY9xEWiiVzt__eUY1W02m6L5gDDE-dFaCVQH8NZmrtA~~",
            img: "https://pocket-image-cache.com/150x150/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2F45d72c81-e719-4a21-8448-462f734d7ca5.jpeg",
            summary:
              "The word has become shorthand for being male-centred, prompting women to share their dating horror stories and unlearn their ‘bird’ behaviour before summertime",
            media: "Dazed",
            author: "Isabel Bekele",
          },
          {
            title:
              "Butter or Oil? 5 Professional Pastry Chefs Reveal the Best One for Better-Than-Bakery Cakes",
            url: "https://clicks.mozilla.org/f/a/A7H_VLC88oRgJ0LZRUPcRQ~~/AAQRxRA~/QKMP-PZme5I1gJyD7QDockMTSFmxlDaWmTbL6C3tKqd4U_lXB6WVciW6NE46waSSpbLTkQK4eFgU--zR6pzqyrQgIqvF5GpMnwM-t0mFardH7bbyFcGo9qvMJiE-sS4MTGAOW8DwJSBcZt4bNbve8lgdu0xphENWdpvMm6sEiF3tumc0HC27zl1OSmh3ubhtemR-NzO1G04AAGNsdH2N_cCK5vePg5CgUmtFC1EtdemUl2JNm7CKKrLyprQrujDPXXA0VhEq35XgmklCY5hmnVLsklwYhSEMNh8hF3kZ8fIjCICxg8ZTEVh05SKiZxMlwJ3HA2zYdFsm8HhcRtuLoZB1JeB5La0OmAm1clfC7twsv9o2ejg3ou8Yi2iybrQvar3LMiZa0rnSpONkPfCXToguTn_vNFZ28JnZbJB_5SWtKF0pbdPrmKX1rYI2jefCwq_2FqXEV7tyYaM0gQr1kw~~",
            img: "https://pocket-image-cache.com/150x150/filters:format(jpeg):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2F4c7ff71c-a74f-4dda-a402-a844da03a8c6.jpeg",
            summary: "The debate is out.",
            media: "The Kitchn",
            author: "Alexandra Foster",
          },
        ],
      },
    ]

    assert.deepEqual(actual, expected)

    // articlesToMarkdown
    const markdown = articlesToMarkdown(actual, { titleWithUrl: true })

    const expectedMarkdown = readFileSync(
      join(
        dirname,
        "../../../../readwise-weekly-and-tentabs/generated/why-are-we-always-charging-our-phone-batteries.md",
      ),
      {
        encoding: "utf-8",
      },
    )

    assert.equal(markdown, expectedMarkdown)
  })
})
