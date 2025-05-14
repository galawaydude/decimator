Decimator is basically an Electron Desktop Client to interact with an IPFS cluster.

"So is it just a front-end for interacting the IPFS Network?"

Traditional IPFS does not include data redundancy, and instead uses replication to ensure availibility of files on the network.
Hence the objective of this project is introduce Erasure Coding (Reed-Solomon) to ensure data redundancy without storing multiple copies of the same file
across different nodes on the network. Depending on the RS(n, k) values chosen (which can be fine-tuned according to the use case), this system can significantly
reduce the amount of space used by files on the network.

Currently this application assumes a working layer of IPFS Cluster but that will be packaged into this repository later.

A working demo / use case video: https://www.youtube.com/watch?v=XbR2kST_KW8
