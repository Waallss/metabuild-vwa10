"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { Coins, Wallet, CheckCircle, ExternalLink, Loader2, Zap } from "lucide-react"

interface MetaverseFormData {
  name: string
  description: string
  image: File | null
  tokenName: string
  tokenSymbol: string
  initialSupply: string
  recipientWallet: string
  category: string
}

export function OnchainMetaverseCreator() {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [isDeploying, setIsDeploying] = useState(false)
  const [deploymentStatus, setDeploymentStatus] = useState<"idle" | "deploying" | "success" | "error">("idle")
  const [txHash, setTxHash] = useState<string>("")
  const [nftTokenId, setNftTokenId] = useState<string>("")

  const [formData, setFormData] = useState<MetaverseFormData>({
    name: "",
    description: "",
    image: null,
    tokenName: "",
    tokenSymbol: "",
    initialSupply: "1000000",
    recipientWallet: "",
    category: "conference",
  })

  const handleInputChange = (field: keyof MetaverseFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }))
    }
  }

  const simulateOnchainDeployment = async () => {
    setIsDeploying(true)
    setDeploymentStatus("deploying")

    try {
      // Simulate token deployment
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast({
        title: "Token Contract Deployed",
        description: `${formData.tokenSymbol} deployed successfully on Base`,
      })

      // Simulate NFT minting
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const mockTxHash = `0x${Math.random().toString(16).substr(2, 64)}`
      const mockTokenId = Math.floor(Math.random() * 10000).toString()

      setTxHash(mockTxHash)
      setNftTokenId(mockTokenId)
      setDeploymentStatus("success")

      toast({
        title: "NFT Minted Successfully!",
        description: `Metaverse NFT #${mockTokenId} minted to ${formData.recipientWallet.slice(0, 6)}...${formData.recipientWallet.slice(-4)}`,
      })
    } catch (error) {
      setDeploymentStatus("error")
      toast({
        title: "Deployment Failed",
        description: "There was an error deploying your metaverse. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeploying(false)
    }
  }

  const resetForm = () => {
    setCurrentStep(1)
    setDeploymentStatus("idle")
    setTxHash("")
    setNftTokenId("")
    setFormData({
      name: "",
      description: "",
      image: null,
      tokenName: "",
      tokenSymbol: "",
      initialSupply: "1000000",
      recipientWallet: "",
      category: "conference",
    })
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.name && formData.description && formData.category
      case 2:
        return formData.tokenName && formData.tokenSymbol && formData.initialSupply
      case 3:
        return formData.recipientWallet && /^0x[a-fA-F0-9]{40}$/.test(formData.recipientWallet)
      default:
        return false
    }
  }

  if (deploymentStatus === "success") {
    return (
      <Card className="bg-card border-border">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <CardTitle className="text-foreground">Metaverse Created Successfully!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">Your metaverse "{formData.name}" has been deployed to Base network</p>
            <Badge className="bg-primary/10 text-primary">NFT #{nftTokenId} Minted</Badge>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Transaction Hash</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(`https://basescan.org/tx/${txHash}`, "_blank")}
                >
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
              <p className="text-xs font-mono text-foreground break-all">{txHash}</p>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Recipient Wallet</span>
                <Wallet className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-xs font-mono text-foreground">{formData.recipientWallet}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={resetForm} variant="outline" className="flex-1 bg-transparent">
              Create Another
            </Button>
            <Button
              onClick={() => window.open(`https://basescan.org/tx/${txHash}`, "_blank")}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View on BaseScan
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          Create Metaverse Onchain
        </CardTitle>
        <div className="flex items-center gap-2">
          <Progress value={(currentStep / 3) * 100} className="flex-1" />
          <span className="text-sm text-muted-foreground">{currentStep}/3</span>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={currentStep.toString()} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="1" disabled={currentStep < 1}>
              Basic Info
            </TabsTrigger>
            <TabsTrigger value="2" disabled={currentStep < 2}>
              Token Setup
            </TabsTrigger>
            <TabsTrigger value="3" disabled={currentStep < 3}>
              Deploy & Mint
            </TabsTrigger>
          </TabsList>

          <TabsContent value="1" className="space-y-4 mt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Metaverse Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="e.g., My Virtual Conference 2025"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe your metaverse experience..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                >
                  <option value="conference">Conference</option>
                  <option value="workshop">Workshop</option>
                  <option value="exhibition">Exhibition</option>
                  <option value="social">Social Space</option>
                  <option value="gaming">Gaming</option>
                  <option value="education">Education</option>
                </select>
              </div>

              <div>
                <Label htmlFor="image">Metaverse Image</Label>
                <div className="mt-2">
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full p-2 border border-border rounded-md bg-background text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground"
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={() => setCurrentStep(2)}
              disabled={!isStepValid(1)}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Continue to Token Setup
            </Button>
          </TabsContent>

          <TabsContent value="2" className="space-y-4 mt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="tokenName">Token Name</Label>
                <Input
                  id="tokenName"
                  value={formData.tokenName}
                  onChange={(e) => handleInputChange("tokenName", e.target.value)}
                  placeholder="e.g., My Conference Token"
                />
              </div>

              <div>
                <Label htmlFor="tokenSymbol">Token Symbol</Label>
                <Input
                  id="tokenSymbol"
                  value={formData.tokenSymbol}
                  onChange={(e) => handleInputChange("tokenSymbol", e.target.value.toUpperCase())}
                  placeholder="e.g., $CONF"
                  maxLength={10}
                />
              </div>

              <div>
                <Label htmlFor="initialSupply">Initial Supply</Label>
                <Input
                  id="initialSupply"
                  type="number"
                  value={formData.initialSupply}
                  onChange={(e) => handleInputChange("initialSupply", e.target.value)}
                  placeholder="1000000"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setCurrentStep(1)} variant="outline" className="flex-1">
                Back
              </Button>
              <Button
                onClick={() => setCurrentStep(3)}
                disabled={!isStepValid(2)}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                Continue to Deploy
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="3" className="space-y-4 mt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="recipientWallet">Recipient Wallet Address</Label>
                <Input
                  id="recipientWallet"
                  value={formData.recipientWallet}
                  onChange={(e) => handleInputChange("recipientWallet", e.target.value)}
                  placeholder="0x..."
                />
                <p className="text-xs text-muted-foreground mt-1">
                  The wallet address that will receive the metaverse NFT
                </p>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                <h4 className="font-medium text-foreground">Deployment Summary</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Deploy ERC-20 token: {formData.tokenSymbol}</p>
                  <p>• Mint metaverse NFT to specified wallet</p>
                  <p>• Register on Base network</p>
                  <p>• Gas fees: ~0.001 ETH</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setCurrentStep(2)} variant="outline" className="flex-1" disabled={isDeploying}>
                Back
              </Button>
              <Button
                onClick={simulateOnchainDeployment}
                disabled={!isStepValid(3) || isDeploying}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                {isDeploying ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Deploying...
                  </>
                ) : (
                  <>
                    <Coins className="w-4 h-4 mr-2" />
                    Deploy Onchain
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
