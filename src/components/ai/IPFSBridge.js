import { create } from '@web3-storage/w3up-client'

const file = new File(['https://oaidalleapiprodscus.blob.core.windows.net/private/org-qa2Jgqs09xO0Z74aohcNwVo5/user-M2OfWPliM2A1lIKxRKLLakAY/img-VjIEdv1L5Yb7DtGDXVefUXwD.png?st=2024-04-09T02%3A16%3A11Z&se=2024-04-09T04%3A16%3A11Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-04-09T00%3A11%3A29Z&ske=2024-04-10T00%3A11%3A29Z&sks=b&skv=2021-08-06&sig=dXGXIH/uLS1w3jqKX/BIH15B8ZWU0tE6HFfDVW6hVJo%3D'], 'nft.png')
 
const client = await create()

const myAccount = await client.login('logan.dembicki@gmail.com')

const space = await client.createSpace('my-awesome-space')


await myAccount.provision(space.did())

await space.save()

await client.setCurrentSpace(space.did())

// const recovery = await space.createRecovery(myAccount.did())
// await client.capability.access.delegate({
//   space: space.did(),
//   delegations: [recovery],
// })
   
// await client.uploadFile(file)

