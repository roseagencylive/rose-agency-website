import AVFoundation
import AppKit
import CoreGraphics
import CoreText
import Foundation

let width = 1920
let height = 1080
let fps: Int32 = 30
let duration = 8.0
let totalFrames = Int(duration * Double(fps))

let outputURL = URL(fileURLWithPath: CommandLine.arguments.count > 1 ? CommandLine.arguments[1] : "public/downloads/rose-what-am-i-missing-sequence.mp4")

try? FileManager.default.createDirectory(at: outputURL.deletingLastPathComponent(), withIntermediateDirectories: true)
try? FileManager.default.removeItem(at: outputURL)

let writer = try AVAssetWriter(outputURL: outputURL, fileType: .mp4)
let settings: [String: Any] = [
  AVVideoCodecKey: AVVideoCodecType.h264,
  AVVideoWidthKey: width,
  AVVideoHeightKey: height,
  AVVideoCompressionPropertiesKey: [
    AVVideoAverageBitRateKey: 12_000_000,
    AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel
  ]
]

let input = AVAssetWriterInput(mediaType: .video, outputSettings: settings)
input.expectsMediaDataInRealTime = false

let adaptor = AVAssetWriterInputPixelBufferAdaptor(
  assetWriterInput: input,
  sourcePixelBufferAttributes: [
    kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32ARGB,
    kCVPixelBufferWidthKey as String: width,
    kCVPixelBufferHeightKey as String: height
  ]
)

guard writer.canAdd(input) else {
  fatalError("Cannot add writer input")
}
writer.add(input)
writer.startWriting()
writer.startSession(atSourceTime: .zero)

func clamp(_ value: Double, _ minValue: Double = 0, _ maxValue: Double = 1) -> Double {
  min(max(value, minValue), maxValue)
}

func easeOut(_ value: Double) -> Double {
  let t = clamp(value)
  return 1 - pow(1 - t, 3)
}

func easeInOut(_ value: Double) -> Double {
  let t = clamp(value)
  return t < 0.5 ? 4 * t * t * t : 1 - pow(-2 * t + 2, 3) / 2
}

func color(_ hex: UInt32, _ alpha: CGFloat = 1) -> CGColor {
  let r = CGFloat((hex >> 16) & 0xff) / 255
  let g = CGFloat((hex >> 8) & 0xff) / 255
  let b = CGFloat(hex & 0xff) / 255
  return CGColor(red: r, green: g, blue: b, alpha: alpha)
}

let black = color(0x070505)
let burgundy = color(0x3A0813)
let wine = color(0x641628)
let cream = color(0xF8EEDC)
let muted = color(0xCDBFA9)
let gold = color(0xD8B66A)
let goldSoft = color(0xF0D58B)
let red = color(0xE01B2F)

func drawText(
  _ text: String,
  in context: CGContext,
  rect: CGRect,
  size: CGFloat,
  weight: CGFloat = 0.0,
  color textColor: CGColor = cream,
  alignment: CTTextAlignment = .center,
  tracking: CGFloat = 0,
  italic: Bool = false
) {
  var traits: CTFontSymbolicTraits = []
  if italic { traits.insert(.traitItalic) }
  let baseFont = CTFontCreateWithName("Georgia" as CFString, size, nil)
  let descriptor = CTFontCopyFontDescriptor(baseFont)
  let traited = CTFontDescriptorCreateCopyWithSymbolicTraits(descriptor, traits, traits) ?? descriptor
  let font = CTFontCreateWithFontDescriptor(traited, size, nil)
  let paragraph = NSMutableParagraphStyle()
  paragraph.alignment = NSTextAlignment(rawValue: Int(alignment.rawValue)) ?? .center
  let attrs: [NSAttributedString.Key: Any] = [
    .font: font,
    .foregroundColor: textColor,
    .paragraphStyle: paragraph,
    .kern: tracking,
    .strokeWidth: weight
  ]
  let attributed = NSAttributedString(string: text, attributes: attrs)
  let framesetter = CTFramesetterCreateWithAttributedString(attributed)
  let path = CGPath(rect: rect, transform: nil)
  let frame = CTFramesetterCreateFrame(framesetter, CFRangeMake(0, attributed.length), path, nil)
  context.saveGState()
  context.translateBy(x: 0, y: rect.maxY + rect.minY)
  context.scaleBy(x: 1, y: -1)
  CTFrameDraw(frame, context)
  context.restoreGState()
}

func drawRoundedRect(_ ctx: CGContext, _ rect: CGRect, radius: CGFloat, fill: CGColor, stroke: CGColor? = nil, lineWidth: CGFloat = 1) {
  let path = CGPath(roundedRect: rect, cornerWidth: radius, cornerHeight: radius, transform: nil)
  ctx.addPath(path)
  ctx.setFillColor(fill)
  ctx.fillPath()
  if let stroke {
    ctx.addPath(path)
    ctx.setStrokeColor(stroke)
    ctx.setLineWidth(lineWidth)
    ctx.strokePath()
  }
}

func drawBackground(_ ctx: CGContext, time: Double) {
  let colors = [black, color(0x16070B), burgundy, black] as CFArray
  let locations: [CGFloat] = [0, 0.38, 0.72, 1]
  let gradient = CGGradient(colorsSpace: CGColorSpaceCreateDeviceRGB(), colors: colors, locations: locations)!
  ctx.drawLinearGradient(gradient, start: CGPoint(x: 0, y: 0), end: CGPoint(x: CGFloat(width), y: CGFloat(height)), options: [])

  let glowAlpha = CGFloat(0.18 + 0.05 * sin(time * 2.1))
  ctx.setFillColor(color(0xD8B66A, glowAlpha))
  ctx.fillEllipse(in: CGRect(x: 210, y: 120, width: 540, height: 540))
  ctx.setFillColor(color(0x641628, 0.72))
  ctx.fillEllipse(in: CGRect(x: 1270, y: 120, width: 640, height: 620))

  ctx.setStrokeColor(color(0xF8EEDC, 0.07))
  ctx.setLineWidth(1)
  for x in stride(from: 0, through: width, by: 72) {
    ctx.move(to: CGPoint(x: x, y: 0))
    ctx.addLine(to: CGPoint(x: x, y: height))
  }
  for y in stride(from: 0, through: height, by: 72) {
    ctx.move(to: CGPoint(x: 0, y: y))
    ctx.addLine(to: CGPoint(x: width, y: y))
  }
  ctx.strokePath()

  let sweepX = CGFloat(-600 + (time.truncatingRemainder(dividingBy: 2.1) / 2.1) * 3000)
  ctx.saveGState()
  ctx.translateBy(x: sweepX, y: 0)
  ctx.rotate(by: 0.2)
  let sweep = CGGradient(colorsSpace: CGColorSpaceCreateDeviceRGB(), colors: [color(0xD8B66A, 0), color(0xD8B66A, 0.32), color(0xD8B66A, 0)] as CFArray, locations: [0, 0.5, 1])!
  ctx.drawLinearGradient(sweep, start: CGPoint(x: 0, y: 0), end: CGPoint(x: 260, y: 0), options: [])
  ctx.restoreGState()
}

func drawPhone(_ ctx: CGContext, time: Double, alpha: CGFloat) {
  ctx.saveGState()
  ctx.setAlpha(alpha)
  let jitter = CGFloat(sin(time * 48) * 5)
  let frame = CGRect(x: 120 + jitter, y: 145 - jitter, width: 520, height: 740)
  drawRoundedRect(ctx, frame, radius: 64, fill: color(0x070505, 0.76), stroke: color(0xD8B66A, 0.28), lineWidth: 3)
  drawRoundedRect(ctx, frame.insetBy(dx: 28, dy: 34), radius: 42, fill: color(0x641628, 0.76), stroke: color(0xF8EEDC, 0.08), lineWidth: 1)
  drawRoundedRect(ctx, CGRect(x: frame.midX - 62, y: frame.minY + 18, width: 124, height: 12), radius: 6, fill: color(0xF8EEDC, 0.22))
  drawRoundedRect(ctx, CGRect(x: frame.minX + 62, y: frame.minY + 78, width: 82, height: 36), radius: 18, fill: red)
  drawText("LIVE", in: ctx, rect: CGRect(x: frame.minX + 68, y: frame.minY + 83, width: 70, height: 22), size: 18, color: CGColor.white, tracking: 2)
  let viewers = ["1.2K", "904", "621", "488", "312"][Int(time * 8) % 5]
  drawText(viewers, in: ctx, rect: CGRect(x: frame.maxX - 140, y: frame.minY + 82, width: 80, height: 24), size: 19, color: cream)

  let comments = ["joined", "left", "what is this about?", "can you explain?", "new viewer", "wait..."]
  for i in 0..<comments.count {
    let offset = CGFloat((time * 95 + Double(i * 64)).truncatingRemainder(dividingBy: 380))
    let row = CGRect(x: frame.minX + 60, y: frame.maxY - 130 - offset, width: CGFloat(160 + (i % 3) * 54), height: 34)
    drawRoundedRect(ctx, row, radius: 17, fill: color(0xF8EEDC, 0.10))
    drawText(comments[i], in: ctx, rect: row.insetBy(dx: 14, dy: 7), size: 13, color: color(0xF8EEDC, 0.88), alignment: .left)
  }
  drawRoundedRect(ctx, CGRect(x: frame.minX + 64, y: frame.maxY - 76, width: 390, height: 12), radius: 6, fill: color(0xF8EEDC, 0.12))
  drawRoundedRect(ctx, CGRect(x: frame.minX + 64, y: frame.maxY - 76, width: CGFloat(320 - 210 * clamp(time / 2.4)), height: 12), radius: 6, fill: gold)
  ctx.restoreGState()
}

func drawSignalCards(_ ctx: CGContext, time: Double, alpha: CGFloat) {
  let cards = [
    ("VIEWERS", "1,284", "782", "419"),
    ("WATCH TIME", "0:42", "0:28", "0:16"),
    ("RETENTION", "41%", "29%", "18%"),
    ("ENGAGEMENT", "Active", "Slowing", "Flat")
  ]
  ctx.saveGState()
  ctx.setAlpha(alpha)
  for (index, card) in cards.enumerated() {
    let delay = Double(index) * 0.12
    let local = clamp((time - delay) / 0.35)
    let slide = CGFloat((1 - easeOut(local)) * 70)
    let rect = CGRect(x: CGFloat(1030) + slide, y: CGFloat(135 + index * 142), width: 720, height: 112)
    drawRoundedRect(ctx, rect, radius: 18, fill: color(0x070505, 0.66), stroke: color(0xD8B66A, 0.24), lineWidth: 2)
    drawText(card.0, in: ctx, rect: CGRect(x: rect.minX + 28, y: rect.minY + 18, width: 270, height: 28), size: 19, color: gold, alignment: .left, tracking: 3)
    drawText("DOWN", in: ctx, rect: CGRect(x: rect.maxX - 140, y: rect.minY + 18, width: 92, height: 26), size: 18, color: color(0xFFB4B4), tracking: 1)
    drawText("\(card.1)  ->  \(card.2)  ->  \(card.3)", in: ctx, rect: CGRect(x: rect.minX + 28, y: rect.minY + 56, width: 430, height: 28), size: 20, color: muted, alignment: .left)
    drawRoundedRect(ctx, CGRect(x: rect.minX + 28, y: rect.maxY - 22, width: 420, height: 10), radius: 5, fill: color(0xF8EEDC, 0.10))
    drawRoundedRect(ctx, CGRect(x: rect.minX + 28, y: rect.maxY - 22, width: CGFloat(340 - 210 * clamp((time - delay) / 1.4)), height: 10), radius: 5, fill: color(0xFFB4B4))
  }
  ctx.restoreGState()
}

func drawQuestionStorm(_ ctx: CGContext, time: Double, alpha: CGFloat) {
  let questions = [
    "SHOULD I STAY LIVE LONGER?",
    "WHY ARE PEOPLE LEAVING?",
    "DO I NEED A BETTER SETUP?",
    "WHY ISN'T THIS WORKING?",
    "AM I GOING LIVE AT THE WRONG TIME?",
    "WHAT AM I MISSING?"
  ]
  ctx.saveGState()
  ctx.setAlpha(alpha)
  for i in 0..<questions.count {
    let pulse = easeInOut((sin(time * 5 + Double(i)) + 1) / 2)
    let x = CGFloat(520 + (i % 2) * 175) + CGFloat(sin(time * 4 + Double(i)) * 40)
    let y = CGFloat(305 + i * 72) + CGFloat(cos(time * 5 + Double(i)) * 18)
    let rect = CGRect(x: x, y: y, width: CGFloat(560 + (i % 2) * 90), height: 52)
    drawRoundedRect(ctx, rect, radius: 14, fill: color(0x070505, CGFloat(0.54 + 0.18 * pulse)), stroke: color(0xD8B66A, CGFloat(0.16 + 0.16 * pulse)), lineWidth: 2)
    drawText(questions[i], in: ctx, rect: rect.insetBy(dx: 20, dy: 15), size: 21, color: cream, tracking: 2)
  }
  ctx.restoreGState()
}

func drawMissingText(_ ctx: CGContext, time: Double) {
  let local = clamp((time - 3.5) / 2.0)
  let push = CGFloat(0.94 + 0.08 * easeOut(local))
  ctx.saveGState()
  ctx.translateBy(x: CGFloat(width) / 2, y: CGFloat(height) / 2)
  ctx.scaleBy(x: push, y: push)
  ctx.translateBy(x: -CGFloat(width) / 2, y: -CGFloat(height) / 2)
  drawText("WHAT", in: ctx, rect: CGRect(x: 0, y: 270, width: width, height: 128), size: 142, color: cream)
  drawText("AM I", in: ctx, rect: CGRect(x: 0, y: 414, width: width, height: 128), size: 142, color: cream)
  drawText("MISSING?", in: ctx, rect: CGRect(x: 0, y: 558, width: width, height: 132), size: 150, color: goldSoft, italic: true)
  ctx.restoreGState()
}

func drawMoreText(_ ctx: CGContext, time: Double) {
  let local = clamp((time - 5.5) / 2.5)
  drawPhone(ctx, time: time * 0.45, alpha: 0.34)
  drawSignalCards(ctx, time: time * 0.4, alpha: 0.32)
  drawText("WHAT AM I MISSING?", in: ctx, rect: CGRect(x: 0, y: CGFloat(235 - 60 * easeOut(local)), width: CGFloat(width), height: 96), size: 90, color: color(0xF8EEDC, 0.62))
  drawText("I KNOW MY LIVE", in: ctx, rect: CGRect(x: 0, y: 432, width: width, height: 110), size: 108, color: cream)
  drawText("CAN BE MORE THAN THIS.", in: ctx, rect: CGRect(x: 0, y: 550, width: width, height: 110), size: 112, color: goldSoft, italic: true)
  let sweepX = CGFloat(-500 + easeOut(local) * 2600)
  ctx.saveGState()
  ctx.translateBy(x: sweepX, y: 0)
  ctx.rotate(by: 0.2)
  let sweep = CGGradient(colorsSpace: CGColorSpaceCreateDeviceRGB(), colors: [color(0xD8B66A, 0), color(0xD8B66A, 0.46), color(0xD8B66A, 0)] as CFArray, locations: [0, 0.5, 1])!
  ctx.drawLinearGradient(sweep, start: CGPoint(x: 0, y: 0), end: CGPoint(x: 260, y: 0), options: [])
  ctx.restoreGState()
}

func makePixelBuffer() -> CVPixelBuffer {
  var pixelBuffer: CVPixelBuffer?
  let attrs = [
    kCVPixelBufferCGImageCompatibilityKey: true,
    kCVPixelBufferCGBitmapContextCompatibilityKey: true
  ] as CFDictionary
  CVPixelBufferCreate(kCFAllocatorDefault, width, height, kCVPixelFormatType_32ARGB, attrs, &pixelBuffer)
  return pixelBuffer!
}

for frame in 0..<totalFrames {
  autoreleasepool {
    let time = Double(frame) / Double(fps)
    let buffer = makePixelBuffer()
    CVPixelBufferLockBaseAddress(buffer, [])
    let context = CGContext(
      data: CVPixelBufferGetBaseAddress(buffer),
      width: width,
      height: height,
      bitsPerComponent: 8,
      bytesPerRow: CVPixelBufferGetBytesPerRow(buffer),
      space: CGColorSpaceCreateDeviceRGB(),
      bitmapInfo: CGImageAlphaInfo.noneSkipFirst.rawValue
    )!
    context.clear(CGRect(x: 0, y: 0, width: width, height: height))
    drawBackground(context, time: time)

    if time < 2.5 {
      drawPhone(context, time: time, alpha: 1)
      drawSignalCards(context, time: time, alpha: 1)
      drawQuestionStorm(context, time: time, alpha: 1)
    } else if time < 3.5 {
      let fade = CGFloat(1 - clamp((time - 2.5) / 1.0) * 0.74)
      drawPhone(context, time: 2.45, alpha: fade)
      drawSignalCards(context, time: 2.45, alpha: fade)
      drawQuestionStorm(context, time: 2.45, alpha: fade)
      context.setFillColor(color(0x070505, CGFloat(clamp((time - 2.5) / 1.0) * 0.62)))
      context.fill(CGRect(x: 0, y: 0, width: width, height: height))
    } else if time < 5.5 {
      context.setFillColor(color(0x070505, 0.78))
      context.fill(CGRect(x: 0, y: 0, width: width, height: height))
      drawMissingText(context, time: time)
    } else {
      drawMoreText(context, time: time)
    }

    let vignette = CGGradient(colorsSpace: CGColorSpaceCreateDeviceRGB(), colors: [color(0x070505, 0), color(0x070505, 0.68)] as CFArray, locations: [0, 1])!
    context.drawRadialGradient(
      vignette,
      startCenter: CGPoint(x: width / 2, y: height / 2),
      startRadius: 200,
      endCenter: CGPoint(x: width / 2, y: height / 2),
      endRadius: 1060,
      options: [.drawsAfterEndLocation]
    )

    CVPixelBufferUnlockBaseAddress(buffer, [])

    while !input.isReadyForMoreMediaData {
      Thread.sleep(forTimeInterval: 0.01)
    }
    let presentationTime = CMTime(value: CMTimeValue(frame), timescale: fps)
    adaptor.append(buffer, withPresentationTime: presentationTime)
  }
}

input.markAsFinished()
writer.finishWriting {
  if writer.status == .completed {
    print(outputURL.path)
  } else {
    print("Render failed: \(writer.error?.localizedDescription ?? "unknown error")")
    exit(1)
  }
}

RunLoop.current.run(until: Date(timeIntervalSinceNow: 2))
