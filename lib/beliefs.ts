export interface BeliefVerse {
  reference: string;
  text: string;
}

export interface BeliefPoint {
  heading: string;
  reference?: string;
  verses?: BeliefVerse[];
  children?: BeliefPoint[];
}

export interface Belief {
  id: number;
  title: string;
  summary: string;
  points: BeliefPoint[];
}

export const beliefs: Belief[] = [
  {
    id: 1,
    title: "One True God",
    summary:
      "Jesus is the one true God manifested in the flesh — the only Saviour, who died for sinners and reigns in heaven with authority to save.",
    points: [
      {
        heading: "Jesus is God manifested in the flesh",
        verses: [
          {
            reference: "John 1:14",
            text: "And the Word became flesh and dwelt among us, and we beheld His glory, the glory as of the only begotten of the Father, full of grace and truth.",
          },
          {
            reference: "1 Timothy 3:16",
            text: "And without controversy great is the mystery of godliness: God was manifested in the flesh, justified in the Spirit, seen by angels, preached among the Gentiles, believed on in the world, received up in glory.",
          },
        ],
      },
      {
        heading: "Jesus is ruler of the heavens and the earth, the one true God",
        reference: "John 1:1-3",
        verses: [
          {
            reference: "John 1:1-3",
            text: "In the beginning was the Word, and the Word was with God, and the Word was God. He was in the beginning with God. All things were made through Him, and without Him nothing was made that was made.",
          },
          {
            reference: "Exodus 3:14",
            text: "Jesus is the one true God who proclaimed Himself to Moses: I AM who I AM.",
          },
          {
            reference: "John 8:24",
            text: "For if you do not believe that I AM, you will die in your sins.",
          },
          {
            reference: "John 8:28",
            text: "When you lift up the Son of Man, then you will know that I AM.",
          },
          {
            reference: "John 8:58",
            text: "Most assuredly, I say to you, before Abraham was I AM.",
          },
        ],
      },
      {
        heading: "Jesus is the only Saviour of mankind",
        reference: "1 Timothy 1:15; 2:5-6",
        verses: [
          {
            reference: "1 Timothy 1:15",
            text: "This is a faithful saying and worthy of all acceptance, that Christ Jesus came into the world to save sinners, of whom I am chief.",
          },
          {
            reference: "1 Timothy 2:5-6",
            text: "For there is one God, and one Mediator between God and men, the Man Christ Jesus, who gave Himself a ransom for all.",
          },
        ],
      },
      {
        heading: "Jesus died on the cross for the sake of sinners",
        reference: "Romans 5:8",
        verses: [
          {
            reference: "Romans 5:8",
            text: "But God demonstrates His own love toward us, in that while we were still sinners, Christ died for us.",
          },
        ],
      },
      {
        heading:
          "Jesus is now in heaven with authority to save all those who trust in Him",
        reference: "Hebrews 4:14",
        verses: [
          {
            reference: "Hebrews 4:14",
            text: "Seeing then that we have a great High Priest who has passed through the heavens, Jesus the Son of God, let us hold fast our confession.",
          },
        ],
      },
      {
        heading: "God's essence",
        children: [
          {
            heading: "Spirit",
            reference: "John 4:24; 1 Timothy 6:15-16",
            verses: [
              {
                reference: "John 4:24",
                text: "God is Spirit, and those who worship Him must worship in spirit and truth.",
              },
              {
                reference: "1 Timothy 6:15-16",
                text: "Which He will manifest in His own time, He who is the blessed and only Potentate, the King of kings, and Lord of lords, who alone has immortality, dwelling in unapproachable light, whom no man has seen or can see, to whom be honor and everlasting power. Amen.",
              },
            ],
          },
          {
            heading: "I AM who I AM",
            reference: "Exodus 3:14; Revelation 1:8",
            verses: [
              {
                reference: "Exodus 3:14",
                text: "And God said to Moses, \"I AM WHO I AM.\" And He said, \"Thus you shall say to the children of Israel, 'I AM has sent me to you.'\"",
              },
              {
                reference: "Revelation 1:8",
                text: "I am the Alpha and the Omega, the Beginning and the End, says the Lord, who is and who was and who is to come, the Almighty.",
              },
            ],
          },
          {
            heading: "The only true God",
            reference: "John 17:3; Deuteronomy 4:35",
            verses: [
              {
                reference: "John 17:3",
                text: "This is eternal life, that they may know You, the only true God, and Jesus Christ whom You have sent.",
              },
              {
                reference: "Deuteronomy 4:35",
                text: "To you it was shown, that you might know that the LORD Himself is God, there is none other besides Him.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Holy Bible",
    summary:
      "The Bible is the inspired, unalterable word of God — the testimony to Jesus Christ, the guide for salvation, and our spiritual food and strength.",
    points: [
      {
        heading: "The Bible was inspired by God",
        verses: [
          {
            reference: "2 Timothy 3:16-17",
            text: "All Scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness, that the man of God may be complete, thoroughly equipped for every good work.",
          },
          {
            reference: "2 Peter 1:21",
            text: "For prophecy never came by the will of man, but holy men of God spoke as they were moved by the Holy Spirit.",
          },
        ],
      },
      {
        heading: "The Bible is the testimony to Jesus Christ and the truth",
        verses: [
          {
            reference: "John 5:39",
            text: "You search the Scriptures, for in them you think you have eternal life, and these are they which testify of Me.",
          },
          {
            reference: "Luke 24:44",
            text: "These are the words which I spoke to you while I was still with you, that all things must be fulfilled which were written in the Law of Moses and the Prophets and the Psalms concerning Me.",
          },
        ],
      },
      {
        heading: "The Bible cannot be altered",
        verses: [
          {
            reference: "Matthew 5:18",
            text: "For assuredly, I say to you, till heaven and earth pass away, one jot or one tittle will by no means pass from the law till all is fulfilled.",
          },
          {
            reference: "Deuteronomy 12:32",
            text: "Whatever I command you, be careful to observe it; you shall not add it nor take away from it.",
          },
        ],
      },
      {
        heading: "The Bible is the guide for salvation",
        verses: [
          {
            reference: "John 17:17",
            text: "Sanctify them by Your truth. Your word is truth.",
          },
          {
            reference: "Hebrews 4:12",
            text: "For the word of God is living and powerful, and sharper than any two-edged sword, piercing even to the division of soul and spirit, and of joints and marrow, and is a discerner of the thoughts and intents of the heart.",
          },
          {
            reference: "James 1:21",
            text: "Therefore, lay aside all filthiness and overflow of wickedness, and receive with meekness the implanted word, which is able to save your souls.",
          },
          {
            reference: "1 Peter 1:23",
            text: "Having been born again, not of corruptible seed but incorruptible, through the word of God which lives and abides forever.",
          },
        ],
      },
      {
        heading: "The Bible is our spiritual food and our strength",
        verses: [
          {
            reference: "Jeremiah 15:16",
            text: "Your words were found, and I ate them, and Your word was to me the joy and rejoicing of my heart; for I am called by Your name, O LORD God of hosts.",
          },
          {
            reference: "Romans 15:4",
            text: "For whatever things were written before were written for our learning, that we through the patience and comfort of the Scriptures might have hope.",
          },
          {
            reference: "Ephesians 6:17",
            text: "And take the sword of the Spirit, which is the word of God.",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "One True Church",
    summary:
      "The True Jesus Church, established through the latter rain of the Holy Spirit, is the assembly of the redeemed and the body of Christ, restoring the apostolic church.",
    points: [
      {
        heading: "Identity of the church",
        children: [
          {
            heading: "It is the assembly of the redeemed",
            reference: "Acts 20:28",
            verses: [
              {
                reference: "Acts 20:28",
                text: "Therefore take heed to yourselves and to all the flock, among which the Holy Spirit has made you overseers, to shepherd the church of God which He purchased with His own blood.",
              },
            ],
          },
          {
            heading: "Body of Christ",
            reference: "Ephesians 1:22-23; Colossians 1:24",
            verses: [
              {
                reference: "Ephesians 1:22-23",
                text: "And He put all things under His feet, and gave Him to be head over all things to the church, which is His body, the fullness of Him who fills all in all.",
              },
              {
                reference: "Colossians 1:24",
                text: "I now rejoice in my sufferings for you, and fill up in my flesh what is lacking in the afflictions of Christ, for the sake of His body, which is the church.",
              },
            ],
          },
        ],
      },
      {
        heading:
          "The True Jesus Church was established by the Lord through the latter rain of the Holy Spirit",
        reference: "Joel 2:23",
        verses: [
          {
            reference: "Joel 2:23",
            text: "Be glad then, you children of Zion, and rejoice in the Lord your God; for He has given you the former rain faithfully, and He will cause the rain to come down for you— the former rain, and the latter rain in the first month.",
          },
        ],
      },
      {
        heading: "To revive the True Church of the apostolic period",
        verses: [
          {
            reference: "Amos 9:11",
            text: "On that day I will raise up the tabernacle of David, which has fallen down, and repair its damages; I will raise up its ruins, and rebuild it as in the days of old.",
          },
          {
            reference: "Haggai 2:9",
            text: "The glory of this latter temple shall be greater than the former, says the LORD of hosts. And in this place I will give peace, says the LORD of hosts.",
          },
        ],
      },
      {
        heading: "Prerequisites of the True Church",
        children: [
          {
            heading: "The abidance of the Holy Spirit",
            reference: "Romans 8:9",
            verses: [
              {
                reference: "Romans 8:9",
                text: "But you are not in the flesh but in the Spirit, if indeed the Spirit of God dwells in you. Now if anyone does not have the Spirit of Christ, he is not His.",
              },
            ],
          },
          {
            heading: "The pillar and ground of the truth",
            reference: "1 Timothy 3:15; Galatians 1:6-8",
            verses: [
              {
                reference: "1 Timothy 3:15",
                text: "But I am delayed, I write so that you may know how you ought to conduct yourself in the house of God, which is the church of the living God, the pillar and ground of the truth.",
              },
              {
                reference: "Galatians 1:6-8",
                text: "I marvel that you are turning away so soon from Him who called you in the grace of Christ, to a different gospel, which is not another; but there are some who trouble you and want to pervert the gospel of Christ. But even if we, or an angel from heaven, preach any other gospel to you than what we have preached to you, let him be accursed.",
              },
            ],
          },
          {
            heading: "The presence of signs and miracles",
            verses: [
              {
                reference: "Mark 16:20",
                text: "And they went out and preached everywhere, the Lord working with them, and confirming the word through the accompanying signs. Amen.",
              },
              {
                reference: "Hebrews 2:4",
                text: "God also bearing witness both with signs and wonders, with various miracles, and gifts of the Holy Spirit, according to His own will?",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "The Sacrament of Water Baptism",
    summary:
      "Baptism, by the blood of Jesus and the unity of water and Spirit, brings regeneration, remission of sins, and salvation — by full immersion in living water, in the name of Jesus Christ.",
    points: [
      {
        heading: "Source of Cleansing",
        children: [
          {
            heading: "Blood of Jesus",
            reference: "1 Peter 1:18-20",
            verses: [
              {
                reference: "1 Peter 1:18-20",
                text: "Knowing that you were not redeemed with corruptible things, like silver or gold, from your aimless conduct received by tradition from your fathers, but with the precious blood of Christ, as of a lamb without blemish and without spot. He indeed was foreordained before the foundation of the world, but was manifest in these last times for you.",
              },
            ],
          },
          {
            heading: "Unity of blood, water, and spirit",
            reference: "1 John 5:6-8",
            verses: [
              {
                reference: "1 John 5:6-8",
                text: "This is He who came by water and blood—Jesus Christ; not only by water, but by water and blood. And it is the Spirit who bears witness, because the Spirit is truth. For there are three that bear witness in heaven: the Father, the Word, and the Holy Spirit; and these three are one. And there are three that bear witness on earth: the Spirit, the water, and the blood; and these three agree as one.",
              },
            ],
          },
        ],
      },
      {
        heading: "Effect of Baptism",
        children: [
          {
            heading: "Regeneration",
            verses: [
              {
                reference: "John 3:5",
                text: "Jesus answered, \"Most assuredly, I say to you, unless one is born of water and the Spirit, he cannot enter the kingdom of God.\"",
              },
              {
                reference: "Titus 3:5",
                text: "Not by works of righteousness which we have done, but according to His mercy He saved us, through the washing of regeneration and renewing of the Holy Spirit.",
              },
            ],
          },
          {
            heading: "Remission of sins",
            verses: [
              {
                reference: "Acts 2:38",
                text: "Repent, and let every one of you be baptized in the name of Jesus Christ for the remission of sins; and you shall receive the gift of the Holy Spirit.",
              },
              {
                reference: "Acts 22:16",
                text: "And now why are you waiting? Arise and be baptized, and wash away your sins, calling on the name of the Lord.",
              },
            ],
          },
          {
            heading: "Salvation",
            reference: "Mark 16:16",
            verses: [
              {
                reference: "Mark 16:16",
                text: "He who believes and is baptized will be saved; but he who does not believe will be condemned.",
              },
            ],
          },
          {
            heading: "Belongs to Jesus",
            reference: "Romans 6:3-4",
            verses: [
              {
                reference: "Romans 6:3-4",
                text: "Or do you not know that as many of us as were baptized into Christ Jesus were baptized into His death? Therefore we were buried with Him through baptism into death, that just as Christ was raised from the dead by the glory of the Father, even so we also should walk in newness of life.",
              },
            ],
          },
          {
            heading: "Attain sonship",
            reference: "Galatians 3:26-29",
            verses: [
              {
                reference: "Galatians 3:26-29",
                text: "For you are all sons of God through faith in Christ Jesus. For as many of you as were baptized into Christ have put on Christ. There is neither Jew nor Greek, there is neither slave nor free, there is neither male nor female; for you are all one in Christ Jesus. And if you are Christ's, then you are Abraham's seed, and heirs according to the promise.",
              },
            ],
          },
        ],
      },
      {
        heading: "Way of Baptism",
        children: [
          {
            heading: "The Baptist",
            children: [
              {
                heading: "Member of the True Jesus Church",
                reference: "Matthew 16:18-19",
                verses: [
                  {
                    reference: "Matthew 16:18-19",
                    text: "And I also say to you that you are Peter, and on this rock I will build My church, and the gates of Hades shall not prevail against it. And I will give you the keys of the kingdom of heaven, and whatever you bind on earth will be bound in heaven, and whatever you loose on earth will be loosed in heaven.",
                  },
                ],
              },
              {
                heading: "Sent by the Holy Spirit",
                reference: "John 20:21-23",
                verses: [
                  {
                    reference: "John 20:21-23",
                    text: "So Jesus said to them again, \"Peace to you! As the Father has sent Me, I also send you.\" And when He had said this, He breathed on them, and said to them, \"Receive the Holy Spirit. If you forgive the sins of any, they are forgiven them; if you retain the sins of any, they are retained.\"",
                  },
                ],
              },
              {
                heading: "Baptized with the Holy Spirit",
                verses: [
                  {
                    reference: "Acts 1:5",
                    text: "For John truly baptized with water, but you shall be baptized with the Holy Spirit not many days from now.",
                  },
                  {
                    reference: "Acts 1:8",
                    text: "But you shall receive power when the Holy Spirit has come upon you; and you shall be witnesses to Me…",
                  },
                ],
              },
            ],
          },
          {
            heading: "The Candidate",
            children: [
              {
                heading: "Believes",
                verses: [
                  {
                    reference: "Mark 16:16",
                    text: "He who believes and is baptized will be saved; but he who does not believe will be condemned.",
                  },
                ],
              },
              {
                heading: "Repents",
                reference: "Acts 2:38",
                verses: [
                  {
                    reference: "Acts 2:38",
                    text: "Then Peter said to them, \"Repent, and let every one of you be baptized in the name of Jesus Christ for the remission of sins; and you shall receive the gift of the Holy Spirit.\"",
                  },
                ],
              },
              {
                heading: "Determines",
                verses: [
                  {
                    reference: "Luke 14:26-27",
                    text: "If anyone comes to Me and does not hate his father and mother, wife and children, brothers and sisters, yes, and his own life also, he cannot be My disciple. And whoever does not bear his cross and come after Me cannot be My disciple.",
                  },
                  {
                    reference: "Acts 14:22",
                    text: "Strengthening the souls of the disciples, exhorting them to continue in the faith, and saying, \"We must through many tribulations enter the kingdom of God.\"",
                  },
                ],
              },
            ],
          },
          {
            heading: "Method",
            children: [
              {
                heading: "In the name of Jesus Christ",
                reference: "Acts 19:5",
                verses: [
                  {
                    reference: "Acts 19:5",
                    text: "When they heard this, they were baptized in the name of the Lord Jesus.",
                  },
                ],
              },
              {
                heading: "Full immersion",
                reference: "Mark 1:9-10; John 3:23",
                verses: [
                  {
                    reference: "Mark 1:9-10",
                    text: "It came to pass in those days that Jesus came from Nazareth of Galilee, and was baptized by John in the Jordan. And immediately, coming up from the water, He saw the heavens parting and the Spirit descending upon Him like a dove.",
                  },
                  {
                    reference: "John 3:23",
                    text: "Now John also was baptizing in Aenon near Salim, because there was much water there. And they came and were baptized.",
                  },
                ],
              },
              {
                heading: "With head bowed",
                reference: "Romans 6:5; John 19:30",
                verses: [
                  {
                    reference: "Romans 6:5",
                    text: "For if we have been united together in the likeness of His death, certainly we also shall be in the likeness of His resurrection.",
                  },
                  {
                    reference: "John 19:30",
                    text: "So when Jesus had received the sour wine, He said, \"It is finished!\" And bowing His head, He gave up His spirit.",
                  },
                ],
              },
              {
                heading: "In living water",
                reference: "Micah 7:19",
                verses: [
                  {
                    reference: "Micah 7:19",
                    text: "He will again have compassion on us, and will subdue our iniquities. You will cast all our sins into the depths of the sea.",
                  },
                ],
              },
              {
                heading: "Once in a lifetime",
                reference: "Hebrews 6:4-8",
                verses: [
                  {
                    reference: "Hebrews 6:4-6",
                    text: "For it is impossible for those who were once enlightened, and have tasted the heavenly gift, and have become partakers of the Holy Spirit, and have tasted the good word of God and the powers of the age to come, if they fall away, to renew them again to repentance, since they crucify again for themselves the Son of God, and put Him to an open shame.",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Holy Spirit",
    summary:
      "The Holy Spirit is the Spirit of God and of Jesus Christ, promised to believers as the guarantee of the heavenly inheritance, evidenced by speaking in tongues.",
    points: [
      {
        heading: "The Holy Spirit is the Spirit of God and Jesus Christ",
        verses: [
          {
            reference: "Romans 8:9",
            text: "But you are not in the flesh but in the Spirit, if indeed the Spirit of God dwells in you. Now if anyone does not have the Spirit of Christ, he is not His.",
          },
          {
            reference: "1 John 3:24",
            text: "Now he who keeps His commandments abides in Him, and He in him. And by this we know that He abides in us, by the Spirit whom He has given us.",
          },
          {
            reference: "2 Corinthians 3:17",
            text: "Now the Lord is the Spirit; and where the Spirit of the Lord is, there is liberty.",
          },
        ],
      },
      {
        heading: "The promise of receiving the Holy Spirit",
        verses: [
          {
            reference: "John 7:37-38",
            text: "Jesus stood and cried out, saying, \"If anyone thirsts, let him come to Me and drink. He who believes in Me, as the Scripture has said, out of his heart will flow rivers of living water.\"",
          },
          {
            reference: "John 16:13",
            text: "However, when He, the Spirit of truth, has come, He will guide you into all truth; for He will not speak on His own authority, but whatever He hears He will speak; and He will tell you things to come.",
          },
          {
            reference: "Luke 24:49",
            text: "Behold, I send the Promise of My Father upon you; but tarry in the city of Jerusalem until you are endued with power from on high.",
          },
        ],
      },
      {
        heading: "Why do we need to receive the promised Holy Spirit",
        children: [
          {
            heading: "Be born of the Spirit",
            verses: [
              {
                reference: "John 3:5",
                text: "Jesus answered, \"Most assuredly, I say to you, unless one is born of water and the Spirit, he cannot enter the kingdom of God.\"",
              },
            ],
          },
          {
            heading: "Receive the power from above",
            verses: [
              {
                reference: "Acts 1:8",
                text: "But you shall receive power when the Holy Spirit has come upon you; and you shall be witnesses to Me…",
              },
            ],
          },
          {
            heading:
              "Receiving the Holy Spirit is the guarantee of the heavenly inheritance",
            reference: "Ephesians 1:13-14",
            verses: [
              {
                reference: "Ephesians 1:13-14",
                text: "In Him you also trusted, after you heard the word of truth, the gospel of your salvation; in whom also, having believed, you were sealed with the Holy Spirit of promise, who is the guarantee of our inheritance until the redemption of the purchased possession, to the praise of His glory.",
              },
            ],
          },
          {
            heading: "Testify for our Sonship",
            verses: [
              {
                reference: "Romans 8:9",
                text: "But you are not in the flesh but in the Spirit, if indeed the Spirit of God dwells in you. Now if anyone does not have the Spirit of Christ, he is not His.",
              },
              {
                reference: "Romans 8:16",
                text: "The Spirit Himself bears witness with our spirit that we are children of God.",
              },
            ],
          },
          {
            heading: "Understand the Truth",
            verses: [
              {
                reference: "John 14:26",
                text: "But the Helper, the Holy Spirit, whom the Father will send in My name, He will teach you all things, and bring to your remembrance all things that I said to you.",
              },
            ],
          },
          {
            heading: "Sanctification",
            verses: [
              {
                reference: "Romans 15:16",
                text: "That I might be a minister of Jesus Christ to the Gentiles, ministering the gospel of God, that the offering of the Gentiles might be acceptable, sanctified by the Holy Spirit.",
              },
              {
                reference: "2 Thessalonians 2:13",
                text: "But we are bound to give thanks to God always for you, brethren beloved by the Lord, because God from the beginning chose you for salvation through sanctification by the Spirit and belief in the truth.",
              },
            ],
          },
          {
            heading: "To bear fruit",
            verses: [
              {
                reference: "Galatians 5:22-23",
                text: "But the fruit of the Spirit is love, joy, peace, longsuffering, kindness, goodness, faithfulness, gentleness, self-control.",
              },
            ],
          },
          {
            heading: "Receive intercession of the Spirit",
            reference: "Romans 8:26-27",
            verses: [
              {
                reference: "Romans 8:26-27",
                text: "Likewise the Spirit also helps in our weaknesses. For we do not know what we should pray for as we ought, but the Spirit Himself makes intercession for us with groanings which cannot be uttered. Now He who searches the hearts knows what the mind of the Spirit is, because He makes intercession for the saints according to the will of God.",
              },
            ],
          },
        ],
      },
      {
        heading: "The evidence of receiving the Holy Spirit",
        children: [
          {
            heading: "Speaking in tongues",
            verses: [
              {
                reference: "Acts 2:4",
                text: "And they were all filled with the Holy Spirit and began to speak with other tongues, as the Spirit gave them utterance.",
              },
              {
                reference: "Acts 10:44-46",
                text: "While Peter was still speaking these words, the Holy Spirit fell upon all those who heard the word. And those of the circumcision who believed were astonished, as many as came with Peter, because the gift of the Holy Spirit had been poured out on the Gentiles also. For they heard them speak with tongues and magnify God.",
              },
            ],
          },
          {
            heading: "Can be seen and heard",
            reference: "Acts 4:20",
            verses: [
              {
                reference: "Acts 4:20",
                text: "For we cannot but speak the things which we have seen and heard.",
              },
            ],
          },
        ],
      },
      {
        heading: "How to Receive the Holy Spirit",
        children: [
          {
            heading: "Believe in God and His word",
            reference: "Galatians 3:14",
            verses: [
              {
                reference: "Galatians 3:14",
                text: "That the blessing of Abraham might come upon the Gentiles in Christ Jesus, that we might receive the promise of the Spirit through faith.",
              },
            ],
          },
          {
            heading: "Repent and be baptized",
            reference: "Acts 2:38",
            verses: [
              {
                reference: "Acts 2:38",
                text: "Then Peter said to them, \"Repent, and let every one of you be baptized in the name of Jesus Christ for the remission of sins; and you shall receive the gift of the Holy Spirit.\"",
              },
            ],
          },
          {
            heading: "Pray with importunity",
            reference: "Luke 11:9-13",
            verses: [
              {
                reference: "Luke 11:9-10",
                text: "So I say to you, ask, and it will be given to you; seek, and you will find; knock, and it will be opened to you. For everyone who asks receives, and he who seeks finds, and to him who knocks it will be opened.",
              },
              {
                reference: "Luke 11:13",
                text: "If you then, being evil, know how to give good gifts to your children, how much more will your heavenly Father give the Holy Spirit to those who ask Him!",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "The Sacrament of Footwashing",
    summary:
      "Footwashing, commanded by Jesus, gives us a part with the Lord and teaches mutual love, complete forgiveness, a purified life, and humble service.",
    points: [
      {
        heading: "Origin: Commanded by Lord Jesus",
        reference: "John 13:14-17",
        verses: [
          {
            reference: "John 13:14-17",
            text: "If I then, your Lord and Teacher, have washed your feet, you also ought to wash one another's feet. For I have given you an example, that you should do as I have done to you. Most assuredly, I say to you, a servant is not greater than his master; nor is he who is sent greater than he who sent him. If you know these things, blessed are you if you do them.",
          },
        ],
      },
      {
        heading: "Effect: To have part with the Lord",
        reference: "John 13:8",
        verses: [
          {
            reference: "John 13:8",
            text: "Peter said to Him, \"You shall never wash my feet!\" Jesus answered him, \"If I do not wash you, you have no part with Me.\"",
          },
        ],
      },
      {
        heading: "The sacrament teaches",
        children: [
          {
            heading: "Mutual love",
            reference: "John 13:1",
            verses: [
              {
                reference: "John 13:1",
                text: "Now before the Feast of the Passover, when Jesus knew that His hour had come that He should depart from this world to the Father, having loved His own who were in the world, He loved them to the end.",
              },
            ],
          },
          {
            heading: "Complete forgiveness",
            reference: "John 13:2-5",
            verses: [
              {
                reference: "John 13:2-5",
                text: "And supper being ended, the devil having already put it into the heart of Judas Iscariot, Simon's son, to betray Him, Jesus, knowing that the Father had given all things into His hands, and that He had come from God and was going to God, rose from supper and laid aside His garments, took a towel and girded Himself. After that, He poured water into a basin and began to wash the disciples' feet, and to wipe them with the towel with which He was girded.",
              },
            ],
          },
          {
            heading: "Purified life",
            reference: "John 13:10",
            verses: [
              {
                reference: "John 13:10",
                text: "Jesus said to him, \"He who is bathed needs only to wash his feet, but is completely clean; and you are clean, but not all of you.\"",
              },
            ],
          },
          {
            heading: "Humble service",
            reference: "John 13:12-14",
            verses: [
              {
                reference: "John 13:12-14",
                text: "So when He had washed their feet, taken His garments, and sat down again, He said to them, \"Do you know what I have done to you? You call Me Teacher and Lord, and you say well, for so I am. If I then, your Lord and Teacher, have washed your feet, you also ought to wash one another's feet.\"",
              },
            ],
          },
        ],
      },
      {
        heading: "Method of Footwashing",
        children: [
          {
            heading: "Follow the example of the Lord Jesus",
            reference: "John 13:15",
            verses: [
              {
                reference: "John 13:15",
                text: "For I have given you an example, that you should do as I have done to you.",
              },
            ],
          },
          {
            heading:
              "Everyone who has been baptized should have their feet washed once in the name of the Lord Jesus Christ",
            reference: "John 13:20",
            verses: [
              {
                reference: "John 13:20",
                text: "Most assuredly, I say to you, he who receives whomever I send receives Me; and he who receives Me receives Him who sent Me.",
              },
            ],
          },
        ],
      },
      {
        heading: "The mutual washing of feet can be performed when necessary",
        verses: [
          {
            reference: "John 13:14",
            text: "If I then, your Lord and Teacher, have washed your feet, you also ought to wash one another's feet.",
          },
          {
            reference: "John 13:34-35",
            text: "A new commandment I give to you, that you love one another; as I have loved you, that you also love one another. By this all will know that you are My disciples, if you have love for one another.",
          },
        ],
      },
    ],
  },
  {
    id: 7,
    title: "The Sacrament of Holy Communion",
    summary:
      "Holy Communion, instituted by the Lord, lets us partake of His flesh and blood to commemorate His death, unify with Him, and receive eternal life.",
    points: [
      {
        heading: "Origin",
        children: [
          {
            heading: "Instituted by the Lord",
            reference: "Luke 22:19-20",
            verses: [
              {
                reference: "Luke 22:19-20",
                text: "And He took bread, gave thanks and broke it, and gave it to them, saying, \"This is My body which is given for you; do this in remembrance of Me.\" Likewise He also took the cup after supper, saying, \"This cup is the new covenant in My blood, which is shed for you.\"",
              },
            ],
          },
          {
            heading: "Commanded by the Lord",
            reference: "1 Corinthians 11:23-25",
            verses: [
              {
                reference: "1 Corinthians 11:23-25",
                text: "For I received from the Lord that which I also delivered to you: that the Lord Jesus on the same night in which He was betrayed took bread; and when He had given thanks, He broke it and said, \"Take, eat; this is My body which is broken for you; do this in remembrance of Me.\" In the same manner He also took the cup after supper, saying, \"This cup is the new covenant in My blood. This do, as often as you drink it, in remembrance of Me.\"",
              },
            ],
          },
        ],
      },
      {
        heading: "Purpose",
        children: [
          {
            heading:
              "To partake of the flesh of the Lord and the blood of the Lord",
            reference: "John 6:55-56",
            verses: [
              {
                reference: "John 6:55-56",
                text: "For My flesh is food indeed, and My blood is drink indeed. He who eats My flesh and drinks My blood abides in Me, and I in him.",
              },
            ],
          },
          {
            heading: "To commemorate the death of the Lord",
            reference: "1 Corinthians 11:26",
            verses: [
              {
                reference: "1 Corinthians 11:26",
                text: "For as often as you eat this bread and drink this cup, you proclaim the Lord's death till He comes.",
              },
            ],
          },
          {
            heading: "To unify with the Lord",
            reference: "1 Corinthians 10:16",
            verses: [
              {
                reference: "1 Corinthians 10:16",
                text: "The cup of blessing which we bless, is it not the communion of the blood of Christ? The bread which we break, is it not the communion of the body of Christ?",
              },
            ],
          },
          {
            heading: "To have eternal life in Lord Jesus",
            reference: "John 6:53",
            verses: [
              {
                reference: "John 6:53",
                text: "Then Jesus said to them, \"Most assuredly, I say to you, unless you eat the flesh of the Son of Man and drink His blood, you have no life in you.\"",
              },
            ],
          },
          {
            heading: "To resurrect on the last day",
            reference: "John 6:54",
            verses: [
              {
                reference: "John 6:54",
                text: "Whoever eats My flesh and drinks My blood has eternal life, and I will raise him up at the last day.",
              },
            ],
          },
        ],
      },
      {
        heading: "Method of holding Holy Communion",
        children: [
          {
            heading: "One unleavened bread",
            reference: "1 Corinthians 10:17; 5:6-8",
            verses: [
              {
                reference: "1 Corinthians 10:17",
                text: "For we, though many, are one bread and one body; for we all partake of that one bread.",
              },
              {
                reference: "1 Corinthians 5:6-8",
                text: "Your glorying is not good. Do you not know that a little leaven leavens the whole lump? Therefore purge out the old leaven, that you may be a new lump, since you truly are unleavened. For indeed Christ, our Passover, was sacrificed for us. Therefore let us keep the feast, not with old leaven, nor with the leaven of malice and wickedness, but with the unleavened bread of sincerity and truth.",
              },
            ],
          },
          {
            heading: "One pot of grape juice should be used",
            reference: "Matthew 26:28-29",
            verses: [
              {
                reference: "Matthew 26:28-29",
                text: "For this is My blood of the new covenant, which is shed for many for the remission of sins. But I say to you, I will not drink of this fruit of the vine from now on until that day when I drink it new with you in My Father's kingdom.",
              },
            ],
          },
          {
            heading: "The sacrament should be held often",
            reference: "1 Corinthians 11:26",
            verses: [
              {
                reference: "1 Corinthians 11:26",
                text: "For as often as you eat this bread and drink this cup, you proclaim the Lord's death till He comes.",
              },
            ],
          },
        ],
      },
      {
        heading: "Partaking of the Holy Communion",
        children: [
          {
            heading: "Must be baptized",
            reference: "1 Corinthians 5:7-8",
            verses: [
              {
                reference: "1 Corinthians 5:7-8",
                text: "Therefore purge out the old leaven, that you may be a new lump, since you truly are unleavened. For indeed Christ, our Passover, was sacrificed for us. Therefore let us keep the feast, not with old leaven, nor with the leaven of malice and wickedness, but with the unleavened bread of sincerity and truth.",
              },
            ],
          },
          {
            heading: "Self-examination",
            reference: "1 Corinthians 11:27-29",
            verses: [
              {
                reference: "1 Corinthians 11:27-29",
                text: "Therefore whoever eats this bread or drinks this cup of the Lord in an unworthy manner will be guilty of the body and blood of the Lord. But let a man examine himself, and so let him eat of the bread and drink of the cup. For he who eats and drinks in an unworthy manner eats and drinks judgment to himself, not discerning the Lord's body.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 8,
    title: "The Holy Sabbath",
    summary:
      "The Sabbath, a divine institution from creation, is a day of rest and holy convocation to remember God's creation and salvation and to hope for eternal rest.",
    points: [
      {
        heading: "Origin of the Sabbath",
        children: [
          {
            heading: "Divine institution",
            reference: "Genesis 2:1-3",
            verses: [
              {
                reference: "Genesis 2:1-3",
                text: "Thus the heavens and the earth, and all the host of them, were finished. And on the seventh day God ended His work which He had done, and He rested on the seventh day from all His work which He had done. Then God blessed the seventh day and sanctified it, because in it He rested from all His work which God had created and made.",
              },
            ],
          },
          {
            heading: "Divine command",
            reference: "Exodus 16:23; 20:8-11",
            verses: [
              {
                reference: "Exodus 16:23",
                text: "Then he said to them, \"This is what the Lord has said: 'Tomorrow is a Sabbath rest, a holy Sabbath to the Lord. Bake what you will bake today, and boil what you will boil; and lay up for yourselves all that remains, to be kept until morning.'\"",
              },
              {
                reference: "Exodus 20:8-11",
                text: "Remember the Sabbath day, to keep it holy. Six days you shall labor and do all your work, but the seventh day is the Sabbath of the Lord your God. In it you shall do no work: you, nor your son, nor your daughter, nor your male servant, nor your female servant, nor your cattle, nor your stranger who is within your gates. For in six days the Lord made the heavens and the earth, the sea, and all that is in them, and rested the seventh day. Therefore the Lord blessed the Sabbath day and hallowed it.",
              },
            ],
          },
          {
            heading: "Divine covenant",
            reference: "Ezekiel 20:12, 19-21",
            verses: [
              {
                reference: "Ezekiel 20:12",
                text: "Moreover I also gave them My Sabbaths, to be a sign between them and Me, that they might know that I am the Lord who sanctifies them.",
              },
              {
                reference: "Ezekiel 20:19-21",
                text: "I am the Lord your God: Walk in My statutes, keep My judgments, and do them; hallow My Sabbaths, and they will be a sign between Me and you, that you may know that I am the Lord your God. Notwithstanding, the children rebelled against Me; they did not walk in My statutes, and were not careful to observe My judgments, 'which, if a man does, he shall live by them'; but they profaned My Sabbaths.",
              },
            ],
          },
        ],
      },
      {
        heading: "The purpose of Sabbath",
        children: [
          {
            heading: "Sabbath was made for man",
            reference: "Mark 2:27-28",
            verses: [
              {
                reference: "Mark 2:27-28",
                text: "And He said to them, \"The Sabbath was made for man, and not man for the Sabbath. Therefore the Son of Man is also Lord of the Sabbath.\"",
              },
            ],
          },
          {
            heading: "To remember God's creation",
            verses: [
              {
                reference: "Genesis 2:3",
                text: "Then God blessed the seventh day and sanctified it, because in it He rested from all His work which God had created and made.",
              },
              {
                reference: "Exodus 20:11",
                text: "For in six days the Lord made the heavens and the earth, the sea, and all that is in them, and rested the seventh day. Therefore the Lord blessed the Sabbath day and hallowed it.",
              },
            ],
          },
          {
            heading: "To remember God's salvation",
            reference: "Deuteronomy 5:15",
            verses: [
              {
                reference: "Deuteronomy 5:15",
                text: "And remember that you were a slave in the land of Egypt, and the Lord your God brought you out from there by a mighty hand and by an outstretched arm; therefore the Lord your God commanded you to keep the Sabbath day.",
              },
            ],
          },
          {
            heading: "To rest from worldly toil",
            reference: "Exodus 23:12",
            verses: [
              {
                reference: "Exodus 23:12",
                text: "Six days you shall do your work, and on the seventh day you shall rest, that your ox and your donkey may rest, and the son of your female servant and the stranger may be refreshed.",
              },
            ],
          },
          {
            heading: "To pursue holiness",
            reference: "Ezekiel 20:12",
            verses: [
              {
                reference: "Ezekiel 20:12",
                text: "Moreover I also gave them My Sabbaths, to be a sign between them and Me, that they might know that I am the Lord who sanctifies them.",
              },
            ],
          },
          {
            heading: "To obtain God's blessing",
            reference: "Isaiah 58:13-14",
            verses: [
              {
                reference: "Isaiah 58:13-14",
                text: "If you turn away your foot from the Sabbath, from doing your pleasure on My holy day, and call the Sabbath a delight, the holy day of the Lord honorable, and shall honor Him, not doing your own ways, nor finding your own pleasure, nor speaking your own words, then you shall delight yourself in the Lord; and I will cause you to ride on the high hills of the earth, and feed you with the heritage of Jacob your father. The mouth of the Lord has spoken.",
              },
            ],
          },
          {
            heading: "To hope eternal rest",
            reference: "Hebrews 4:9-11",
            verses: [
              {
                reference: "Hebrews 4:9-11",
                text: "There remains therefore a rest for the people of God. For he who has entered His rest has himself also ceased from his works as God did from His. Let us therefore be diligent to enter that rest, lest anyone fall according to the same example of disobedience.",
              },
            ],
          },
        ],
      },
      {
        heading: "Sabbath Observance in the New Testament",
        children: [
          {
            heading: "By Jesus Christ",
            reference: "Luke 4:16; Mark 6:2",
            verses: [
              {
                reference: "Luke 4:16",
                text: "So He came to Nazareth, where He had been brought up. And as His custom was, He went into the synagogue on the Sabbath day, and stood up to read.",
              },
              {
                reference: "Mark 6:2",
                text: "And when the Sabbath had come, He began to teach in the synagogue. And many hearing Him were astonished, saying, \"Where did this Man get these things? And what wisdom is this which is given to Him, that such mighty works are performed by His hands!\"",
              },
            ],
          },
          {
            heading: "By the disciples",
            reference: "Luke 23:55-56",
            verses: [
              {
                reference: "Luke 23:55-56",
                text: "And the women who had come with Him from Galilee followed after, and they observed the tomb and how His body was laid. Then they returned and prepared spices and fragrant oils. And they rested on the Sabbath according to the commandment.",
              },
            ],
          },
          {
            heading: "By the church",
            reference: "Acts 15:21",
            verses: [
              {
                reference: "Acts 15:21",
                text: "For Moses has had throughout many generations those who preach him in every city, being read in the synagogues every Sabbath.",
              },
            ],
          },
          {
            heading: "By apostle Paul",
            reference: "Acts 13:13-14",
            verses: [
              {
                reference: "Acts 13:13-14",
                text: "Now when Paul and his party set sail from Paphos, they came to Perga in Pamphylia; and John, departing from them, returned to Jerusalem. But when they departed from Perga, they came to Antioch in Pisidia, and went into the synagogue on the Sabbath day and sat down.",
              },
            ],
          },
        ],
      },
      {
        heading: "The Way to Keep the Sabbath",
        children: [
          {
            heading: "Gather together to have an holy convocation",
            reference: "Leviticus 23:2",
            verses: [
              {
                reference: "Leviticus 23:2",
                text: "Six days shall work be done, but the seventh day is a Sabbath of solemn rest, a holy convocation. You shall do no work on it; it is the Sabbath of the Lord in all your dwellings.",
              },
            ],
          },
          {
            heading: "Receive God's word",
            reference: "Acts 13:44",
            verses: [
              {
                reference: "Acts 13:44",
                text: "On the next Sabbath almost the whole city came together to hear the word of God.",
              },
            ],
          },
          {
            heading: "Preach God's word",
            reference: "Acts 16:13",
            verses: [
              {
                reference: "Acts 16:13",
                text: "And on the Sabbath day we went out of the city to the riverside, where prayer was customarily made; and we sat down and spoke to the women who met there.",
              },
            ],
          },
          {
            heading: "Perform good deeds",
            reference: "Matthew 12:11-13",
            verses: [
              {
                reference: "Matthew 12:11-13",
                text: "Then He said to them, \"What man is there among you who has one sheep, and if it falls into a pit on the Sabbath, will not lay hold of it and lift it out? Of how much more value then is a man than a sheep? Therefore it is lawful to do good on the Sabbath.\" Then He said to the man, \"Stretch out your hand.\" And he stretched it out, and it was restored as whole as the other.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 9,
    title: "Salvation",
    summary:
      "Salvation is deliverance from sin, death, Satan, and the law into God's kingdom and glory — received by grace through faith and kept by pursuing holiness.",
    points: [
      {
        heading: "Meaning of Salvation",
        children: [
          {
            heading: "Deliverance from sin",
            verses: [
              {
                reference: "Matthew 1:21",
                text: "And she will bring forth a Son, and you shall call His name Jesus, for He will save His people from their sins.",
              },
              {
                reference: "1 Timothy 1:15",
                text: "This is a faithful saying and worthy of all acceptance, that Christ Jesus came into the world to save sinners, of whom I am chief.",
              },
            ],
          },
          {
            heading: "Deliverance from death",
            verses: [
              {
                reference: "John 3:16",
                text: "For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life.",
              },
              {
                reference: "Romans 6:23",
                text: "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.",
              },
            ],
          },
          {
            heading: "Deliverance from Satan",
            reference: "Acts 26:18",
            verses: [
              {
                reference: "Acts 26:18",
                text: "To open their eyes, in order to turn them from darkness to light, and from the power of Satan to God, that they may receive forgiveness of sins and an inheritance among those who are sanctified by faith in Me.",
              },
              {
                reference: "1 John 5:19",
                text: "We know that we are of God, and the whole world lies under the sway of the wicked one.",
              },
            ],
          },
          {
            heading: "Deliverance from laws",
            reference: "Galatians 3:13-14",
            verses: [
              {
                reference: "Galatians 3:13-14",
                text: "Christ has redeemed us from the curse of the law, having become a curse for us (for it is written, \"Cursed is everyone who hangs on a tree\"), that the blessing of Abraham might come upon the Gentiles in Christ Jesus, that we might receive the promise of the Spirit through faith.",
              },
            ],
          },
          {
            heading: "Deliverance into God's kingdom",
            verses: [
              {
                reference: "2 Timothy 4:18",
                text: "And the Lord will deliver me from every evil work and preserve me for His heavenly kingdom.",
              },
              {
                reference: "1 John 2:25",
                text: "And this is the promise that He has promised us—eternal life.",
              },
            ],
          },
          {
            heading: "Deliverance into God's glory",
            reference: "Romans 8:29-30",
            verses: [
              {
                reference: "Romans 8:29-30",
                text: "For whom He foreknew, He also predestined to be conformed to the image of His Son, that He might be the firstborn among many brethren. Moreover whom He predestined, these He also called; whom He called, these He also justified; and whom He justified, these He also glorified.",
              },
            ],
          },
        ],
      },
      {
        heading: "Need for Salvation",
        children: [
          {
            heading: "All have sinned",
            reference: "Romans 3:23",
            verses: [
              {
                reference: "Romans 3:23",
                text: "For all have sinned and fall short of the glory of God.",
              },
            ],
          },
          {
            heading: "We cannot save ourselves",
            reference: "Romans 3:20",
            verses: [
              {
                reference: "Romans 3:20",
                text: "Therefore by the deeds of the law no flesh will be justified in His sight, for by the law is the knowledge of sin.",
              },
            ],
          },
        ],
      },
      {
        heading: "Saved by grace through faith in Jesus Christ",
        verses: [
          {
            reference: "John 1:17",
            text: "For the law was given through Moses, but grace and truth came through Jesus Christ.",
          },
          {
            reference: "Ephesians 2:8-9",
            text: "For by grace you have been saved through faith, and that not of yourselves; it is the gift of God, not of works, lest anyone should boast.",
          },
          {
            reference: "Acts 4:12",
            text: "Nor is there salvation in any other, for there is no other name under heaven given among men by which we must be saved.",
          },
        ],
      },
      {
        heading: "How to keep the salvation?",
        children: [
          {
            heading: "Pursue holiness",
            reference: "Hebrews 12:14",
            verses: [
              {
                reference: "Hebrews 12:14",
                text: "Pursue peace with all people, and holiness, without which no one will see the Lord.",
              },
            ],
          },
          {
            heading: "Rely on the renewing of the Holy Spirit",
            reference: "Titus 3:4-5",
            verses: [
              {
                reference: "Titus 3:4-5",
                text: "But when the kindness and the love of God our Savior toward man appeared, not by works of righteousness which we have done, but according to His mercy He saved us, through the washing of regeneration and renewing of the Holy Spirit.",
              },
            ],
          },
          {
            heading:
              "Put into practice the Bible's teaching to honour God and love man",
            reference: "Matthew 22:37-40",
            verses: [
              {
                reference: "Matthew 22:37-40",
                text: "Jesus said to him, \"'You shall love the Lord your God with all your heart, with all your soul, and with all your mind.' This is the first and great commandment. And the second is like it: 'You shall love your neighbor as yourself.' On these two commandments hang all the Law and the Prophets.\"",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 10,
    title: "Second Coming",
    summary:
      "The Lord Jesus will descend on the last day to judge all people — the righteous to eternal life, the wicked to eternal punishment — so we prepare by obeying, watching, and abiding in Him.",
    points: [
      {
        heading: "There is the last day for the world",
        reference: "2 Peter 3:10",
        verses: [
          {
            reference: "2 Peter 3:10",
            text: "But the day of the Lord will come as a thief in the night, in which the heavens will pass away with a great noise, and the elements will melt with fervent heat; both the earth and the works that are in it will be burned up.",
          },
        ],
      },
      {
        heading:
          "The Lord Jesus will descend from heaven on the last day to judge all people",
        reference: "John 5:22",
        verses: [
          {
            reference: "John 5:22",
            text: "For the Father judges no one, but has committed all judgment to the Son.",
          },
        ],
        children: [
          {
            heading: "The righteous will receive eternal life",
            reference: "Matthew 25:46",
            verses: [
              {
                reference: "Matthew 25:46",
                text: "And these will go away into everlasting punishment, but the righteous into eternal life.",
              },
            ],
          },
          {
            heading: "The wicked will receive eternal punishment",
            reference: "Revelation 21:8",
            verses: [
              {
                reference: "Revelation 21:8",
                text: "But the cowardly, unbelieving, abominable, murderers, sexually immoral, sorcerers, idolaters, and all liars shall have their part in the lake which burns with fire and brimstone, which is the second death.",
              },
            ],
          },
        ],
      },
      {
        heading: "Preparing for the Second Coming",
        children: [
          {
            heading: "Accept the Lord",
            reference: "2 Thessalonians 1:7-9",
            verses: [
              {
                reference: "2 Thessalonians 1:7-9",
                text: "And to give you who are troubled rest with us when the Lord Jesus is revealed from heaven with His mighty angels, in flaming fire taking vengeance on those who do not know God, and on those who do not obey the gospel of our Lord Jesus Christ. These shall be punished with everlasting destruction from the presence of the Lord and from the glory of His power.",
              },
            ],
          },
          {
            heading: "Obey the Lord",
            reference: "Matthew 7:21-23",
            verses: [
              {
                reference: "Matthew 7:21-23",
                text: "Not everyone who says to Me, 'Lord, Lord,' shall enter the kingdom of heaven, but he who does the will of My Father in heaven. Many will say to Me in that day, 'Lord, Lord, have we not prophesied in Your name, cast out demons in Your name, and done many wonders in Your name?' And then I will declare to them, 'I never knew you; depart from Me, you who practice lawlessness!'",
              },
            ],
          },
          {
            heading: "Preserve purity",
            reference: "1 Thessalonians 5:23",
            verses: [
              {
                reference: "1 Thessalonians 5:23",
                text: "Now may the God of peace Himself sanctify you completely; and may your whole spirit, soul, and body be preserved blameless at the coming of our Lord Jesus Christ.",
              },
            ],
          },
          {
            heading: "Keep watch",
            reference: "Mark 13:32-37",
            verses: [
              {
                reference: "Mark 13:32-37",
                text: "But of that day and hour no one knows, not even the angels in heaven, nor the Son, but only the Father. Take heed, watch and pray; for you do not know when the time is. It is like a man going to a far country, who left his house and gave authority to his servants, and to each his work, and commanded the doorkeeper to watch. Watch therefore, for you do not know when the master of the house is coming—in the evening, at midnight, at the crowing of the rooster, or in the morning—lest, coming suddenly, he find you sleeping. And what I say to you, I say to all: Watch!",
              },
            ],
          },
          {
            heading: "Congregate with other members",
            reference: "Hebrews 10:25",
            verses: [
              {
                reference: "Hebrews 10:25",
                text: "Not forsaking the assembling of ourselves together, as is the manner of some, but exhorting one another, and so much the more as you see the Day approaching.",
              },
            ],
          },
          {
            heading: "Abide in Jesus Christ",
            reference: "John 15:5-6; 1 John 2:28",
            verses: [
              {
                reference: "John 15:5-6",
                text: "I am the vine, you are the branches. He who abides in Me, and I in him, bears much fruit; for without Me you can do nothing. If anyone does not abide in Me, he is cast out as a branch and is withered; and they gather them and throw them into the fire, and they are burned.",
              },
              {
                reference: "1 John 2:28",
                text: "And now, little children, abide in Him, that when He appears, we may have confidence and not be ashamed before Him at His coming.",
              },
            ],
          },
          {
            heading: "Be a faithful steward",
            reference: "Luke 12:42-44",
            verses: [
              {
                reference: "Luke 12:42-44",
                text: "And the Lord said, \"Who then is that faithful and wise steward, whom his master will make ruler over his household, to give them their portion of food in due season? Blessed is that servant whom his master will find so doing when he comes. Truly, I say to you that he will make him ruler over all that he has.\"",
              },
            ],
          },
          {
            heading: "Perform deeds of love",
            reference: "1 Peter 4:7-8",
            verses: [
              {
                reference: "1 Peter 4:7-8",
                text: "But the end of all things is at hand; therefore be serious and watchful in your prayers. And above all things have fervent love for one another, for \"love will cover a multitude of sins.\"",
              },
            ],
          },
        ],
      },
    ],
  },
];
