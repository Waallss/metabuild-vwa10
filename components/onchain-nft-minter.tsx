"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Loader2, ExternalLink, CheckCircle, AlertCircle } from "lucide-react"

interface OnchainNFTMinterProps {
  metaverseName: string
  metaverseId: string
  tokenSymbol: string
}

export function OnchainNFTMinter({ metaverseName, metaverseId, tokenSymbol }: OnchainNFTMinterProps) {
  const [recipientAddress, setRecipientAddress] = useState("")
  const [isMinting, setIsMinting] = useState(false)
  const [mintStatus, setMintStatus] = useState<"idle" | "minting" | "success" | "error">("idle")
  const [txHash, setTxHash] = useState("")
  const [error, setError] = useState("")

  // Base Sepolia testnet configuration
  const BASE_SEPOLIA_CHAIN_ID = "0x14a34" // 84532 in hex
  const BASE_SEPOLIA_RPC = "https://sepolia.base.org"
  const BASESCAN_URL = "https://sepolia.basescan.org"

  // Mock contract address for demo (replace with actual deployed contract)
  const NFT_CONTRACT_ADDRESS = "0x1234567890123456789012345678901234567890"

  const handleMint = async () => {
    if (!recipientAddress) {
      setError("Please enter a recipient address")
      return
    }

    if (!window.ethereum) {
      setError("MetaMask not detected")
      return
    }

    setIsMinting(true)
    setMintStatus("minting")
    setError("")

    try {
      // Switch to Base Sepolia if needed
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: BASE_SEPOLIA_CHAIN_ID }],
        })
      } catch (switchError: any) {
        // If chain doesn't exist, add it
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: BASE_SEPOLIA_CHAIN_ID,
                chainName: "Base Sepolia",
                nativeCurrency: {
                  name: "ETH",
                  symbol: "ETH",
                  decimals: 18,
                },
                rpcUrls: [BASE_SEPOLIA_RPC],
                blockExplorerUrls: [BASESCAN_URL],
              },
            ],
          })
        }
      }

      // Get connected account
      const accounts = await window.ethereum.request({ method: "eth_accounts" })
      if (accounts.length === 0) {
        throw new Error("No wallet connected")
      }

      // Simulate NFT minting transaction
      // In production, this would call your actual NFT contract
      const mockTxHash = `0x${Math.random().toString(16).substr(2, 64)}`

      // Simulate transaction delay
      await new Promise((resolve) => setTimeout(resolve, 3000))

      setTxHash(mockTxHash)
      setMintStatus("success")

      console.log(`[v0] NFT minted successfully for ${metaverseName}`)
      console.log(`[v0] Transaction hash: ${mockTxHash}`)
      console.log(`[v0] Recipient: ${recipientAddress}`)
    } catch (err: any) {
      console.error("[v0] Minting error:", err)
      setError(err.message || "Failed to mint NFT")
      setMintStatus("error")
    } finally {
      setIsMinting(false)
    }
  }

  const resetMinter = () => {
    setMintStatus("idle")
    setTxHash("")
    setError("")
    setRecipientAddress("")
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="w-2 h-2 bg-primary rounded-full"></span>
          Mint {metaverseName} NFT
        </CardTitle>
        <CardDescription>Mint an NFT representing access to {metaverseName} on Base Sepolia testnet</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {mintStatus === "idle" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient Address</Label>
              <Input
                id="recipient"
                placeholder="0x..."
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                className="font-mono text-sm"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Network:</span>
              <Badge variant="outline">Base Sepolia</Badge>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Token:</span>
              <Badge variant="secondary">{tokenSymbol}</Badge>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button onClick={handleMint} disabled={isMinting} className="w-full">
              {isMinting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Minting NFT...
                </>
              ) : (
                "Mint NFT"
              )}
            </Button>
          </>
        )}

        {mintStatus === "minting" && (
          <div className="text-center py-6">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Minting in Progress</h3>
            <p className="text-sm text-muted-foreground">
              Please confirm the transaction in your wallet and wait for confirmation...
            </p>
          </div>
        )}

        {mintStatus === "success" && (
          <div className="text-center py-6">
            <CheckCircle className="w-8 h-8 mx-auto mb-4 text-green-500" />
            <h3 className="font-semibold mb-2">NFT Minted Successfully!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your {metaverseName} NFT has been minted to {recipientAddress.slice(0, 6)}...{recipientAddress.slice(-4)}
            </p>

            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent"
                onClick={() => window.open(`${BASESCAN_URL}/tx/${txHash}`, "_blank")}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View on BaseScan
              </Button>

              <Button variant="ghost" size="sm" onClick={resetMinter} className="w-full">
                Mint Another
              </Button>
            </div>
          </div>
        )}

        {mintStatus === "error" && (
          <div className="text-center py-6">
            <AlertCircle className="w-8 h-8 mx-auto mb-4 text-red-500" />
            <h3 className="font-semibold mb-2">Minting Failed</h3>
            <p className="text-sm text-muted-foreground mb-4">{error}</p>

            <Button variant="outline" onClick={resetMinter} className="w-full bg-transparent">
              Try Again
            </Button>
          </div>
        )}

        <div className="text-xs text-muted-foreground text-center pt-2 border-t">
          Need testnet ETH? Get it from the{" "}
          <a
            href="https://www.alchemy.com/faucets/base-sepolia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Base Sepolia Faucet
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
