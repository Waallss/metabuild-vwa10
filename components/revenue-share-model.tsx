"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { TrendingUp, Users, Repeat, Gift } from "lucide-react"

export function RevenueShareModel() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Revenue Share Model
          </CardTitle>
          <CardDescription>
            Transparent tokenomics and revenue distribution for MetaBuild City ecosystem
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Primary Sales */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Primary Sales (Initial Mint)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Organizer</span>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  >
                    90%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">Event organizer receives majority of initial sales</p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Meta Build City</span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    10%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">Platform fee for infrastructure and services</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Secondary Sales */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Repeat className="w-4 h-4 text-orange-500" />
              Secondary Sales (Resale)
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Seller</span>
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                  >
                    80%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">Current NFT holder</p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Creator</span>
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                  >
                    10%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">Original organizer royalty</p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Meta Build City</span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    10%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">Platform transaction fee</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Early Adopter Benefits */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Gift className="w-4 h-4 text-pink-500" />
              Early Adopter Benefits
            </h3>
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 p-4 rounded-lg border border-pink-200 dark:border-pink-800">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">First 100 Minters</span>
                  <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">5% Revenue Share</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">First 500 Minters</span>
                  <Badge className="bg-gradient-to-r from-pink-400 to-purple-400 text-white">2% Revenue Share</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Early supporters receive ongoing revenue share from all future sales and platform activities
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Community Benefits */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-500" />
              Community Benefits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-cyan-600 dark:text-cyan-400">Token Holders</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Governance voting rights</li>
                  <li>• Exclusive merchandise access</li>
                  <li>• Priority event registration</li>
                  <li>• Staking rewards</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-cyan-600 dark:text-cyan-400">NFT Holders</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• VIP metaverse access</li>
                  <li>• Exclusive virtual spaces</li>
                  <li>• Revenue sharing opportunities</li>
                  <li>• Creator collaboration perks</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
